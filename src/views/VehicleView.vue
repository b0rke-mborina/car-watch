<template>
	<div class="vehicle">
		<div class="content">
			<h1 class="heading">Vehicle {{ this.$route.params.id }}</h1>
			<div class="vehicle-info">
				<!-- Error message for data retrieval -->
				<ErrorMessage :message="fetchingErrorMessage" v-if="fetchingErrorMessage !== ''" />
				<!-- Form with labels and inputs -->
				<div class="info-group">
					<span class="label">VIN</span>
					<input v-model="vehicle.vin" type="text" readonly class="input" />
				</div>
				<div class="info-group">
					<span class="label">Make</span>
					<input v-model="vehicle.make" type="text" readonly class="input" />
				</div>
				<div class="info-group">
					<span class="label">Model</span>
					<input v-model="vehicle.model" type="text" readonly class="input" />
				</div>
				<div class="info-group">
					<span class="label">Year</span>
					<input v-model="vehicle.year" type="text" readonly class="input" />
				</div>
				<!-- Label and input for owner, changing owner enabled -->
				<div class="info-group">
					<span class="label">Current owner</span>
					<div class="info-group-item">
						<!-- Owner input link (visible only if owner address is not empty) -->
						<router-link v-if="!isChanging && vehicle.currentOwner !== ''"
							:to="{ name: 'owner', 'params': { 'address': vehicle.currentOwner } }" class="action">
							<input v-model="vehicle.currentOwner" type="text" readonly class="input-changeable-link" />
						</router-link>
						<!-- Owner input (visible only if owner address is empty - placeholder until vehicle is fetched) -->
						<input v-model="vehicle.currentOwner" v-if="!isChanging && vehicle.currentOwner === ''"
							type="text" readonly class="input-changeable" />
						<!-- Change owner input (visible only if owner is being changed) -->
						<input v-model="vehicle.currentOwner" v-if="isChanging" type="text" class="input-changeable" />
						<!-- Change owner button (visible only if user address is authorized) -->
						<button v-if="auth.authorized && !isChanging" @click="changeOwner" class="button-change">CHANGE</button>
					</div>
				</div>
				<!-- Action buttons for changing owner -->
				<div class="info-group">
					<span class="label"></span>
					<div v-if="auth.authorized && isChanging" class="info-group-item-changeable">
						<div class="info-group-item-actions">
							<button @click="saveOwner" class="button-finish-change">SAVE</button>
							<button @click="cancelChangingOwner" class="button-finish-change">CANCEL</button>
						</div>
					</div>
					<!-- Error message for changing owner -->
					<ErrorMessage :message="changingErrorMessage" v-if="changingErrorMessage !== ''" />
				</div>
			</div>
			<div class="lists">
				<!-- List of buttons for changing which vehicle items are shown -->
				<div class="list-options">
					<button id="breakdowns" @click="changeItems('breakdowns')"
							  :class="`button-item ${selectedList === 'breakdowns' ? 'active' : ''}`">Breakdowns</button>
					<button id="damages" @click="changeItems('damages')"
							  :class="`button-item ${selectedList === 'damages' ? 'active' : ''}`">Damages</button>
					<button id="services" @click="changeItems('services')"
							  :class="`button-item ${selectedList === 'services' ? 'active' : ''}`">Services</button>
					<button id="repairs" @click="changeItems('repairs')"
							  :class="`button-item ${selectedList === 'repairs' ? 'active' : ''}`">Repairs</button>
					<button id="insurances" @click="changeItems('insurances')"
							  :class="`button-item ${selectedList === 'insurances' ? 'active' : ''}`">Insurances</button>
					<button id="owners" @click="changeItems('owners')"
							  :class="`button-item ${selectedList === 'owners' ? 'active' : ''}`">Owners</button>
				</div>
				<!-- List of vehicle owner items -->
				<div v-if="selectedList === 'owners'" class="list">
					<EmptyListMessage v-if="owners.length === 0" />
					<OwnerItem v-for="owner in owners" v-bind:key="owner" :owner="owner" />
				</div>
				<!-- List of vehicle items -->
				<div v-else class="list">
					<EmptyListMessage v-if="items.length === 0" />
					<ListItem v-for="item in items" v-bind:key="item" :item="item" />
					<!-- Action buttons and input for adding new vehicle item (item is added to selected list) -->
					<div v-if="auth.authorized && isAdding && selectedList != 'owners'" class="list-new-item">
						<!-- Input for adding new vehicle item -->
						<div class="new-item-data">
							<span class="new-item-label">New item description</span>
							<input v-model="newItemDescription" type="text" class="new-item-input" />
						</div>
						<!-- Action buttons for adding new vehicle item -->
						<div class="new-item-actions">
							<button @click="saveNewItem" class="button-finish-change">SAVE</button>
							<button @click="cancelAddingNewItem" class="button-finish-change">CANCEL</button>
						</div>
					</div>
				</div>
				<!-- Error message for adding new vehicle item -->
				<ErrorMessage :message="addingErrorMessage" v-if="addingErrorMessage !== ''" />
				<!-- Add new action button for adding new vehicle item -->
				<div class="list-button-container">
					<button id="breakdowns" v-if="selectedList !== 'owners'" @click="handleAddingItem" class="button-add">ADD NEW</button>
				</div>
			</div>
			<!-- Back button link -->
			<div class="button-container">
				<router-link :to="{ name: 'vehicles', 'params': { 'id': vehicle.id } }" class="action">
					<button class="button">BACK</button>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import { ethers } from "ethers";
import { getVehicle, transferOwnership, getVehicleOwners, addBreakdown, addDamage, addService, addRepair, addInsurance } from "@/services";
import { getVehicleBreakdowns, getVehicleDamages, getVehicleServices, getVehicleRepairs, getVehicleInsurances, Auth } from "@/services";
import EmptyListMessage from "@/components/EmptyListMessage.vue";
import OwnerItem from "@/components/OwnerItem.vue";
import ListItem from "@/components/ListItem.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";

export default {
	name: "VehicleView",
	data() {
		return {
			vehicle: {
				"id": "",
				"vin": "",
				"make": "",
				"model": "",
				"year": "",
				"currentOwner": "",
				"breakdowns": [],
				"damages": [],
				"services": [],
				"repairs": [],
				"insurances": [],
				"owners": []
			},
			items: [],
			owners: [],
			originalOwner: "",
			selectedList: "breakdowns",
			isChanging: false,
			isAdding: false,
			newItemDescription: "",
			fetchingErrorMessage: "",
			changingErrorMessage: "",
			addingErrorMessage: "",
			auth: Auth.state
		}
	},
	async mounted() {
		this.vehicle.id = this.$route.params.id;

		// get vehicle data
		console.log("Started getter");
		try {
			this.vehicle = await getVehicle(this.vehicle.id);
			console.log(this.vehicle);
		} catch (error) {
			this.fetchingErrorMessage = error.message;
		}
		console.log("Ended getter");
		
		// make copies of vehicle data for modification
		this.items = this.vehicle.breakdowns;
		this.owners = this.vehicle.owners;
		this.originalOwner = this.vehicle.currentOwner;
	},
	methods: {
		changeItems(type) {
			this.items = this.vehicle[type];
			this.selectedList = type;
			this.isAdding = false;
			console.log(this.selectedList);
		},
		changeOwner() {
			this.changingErrorMessage = "";
			this.isChanging = true;
		},
		async saveOwner() {
			try {
				// make sure owner address is 
				if (!ethers.utils.isAddress(this.vehicle.currentOwner)) {
					this.vehicle.currentOwner = this.originalOwner;
					throw new Error("Address of the new owner must be valid.");
				}

				// change owner
				const vehicleId = parseInt(this.$route.params.id);
				console.log(vehicleId);
				const response = await transferOwnership(vehicleId, this.vehicle.currentOwner);
				console.log("response");
				console.log(response);
				
				// update page content
				this.originalOwner = this.vehicle.currentOwner;
				this.isChanging = false;
				this.vehicle.owners = await getVehicleOwners(vehicleId);
				this.owners = this.vehicle.owners;
			} catch (error) {
				this.isChanging = false;
				this.changingErrorMessage = error.message;
			}
		},
		cancelChangingOwner() {
			this.isChanging = false;
			this.vehicle.currentOwner = this.originalOwner;
		},
		async saveNewItem() {
			// if description of new item is empty, show error, otherwise execute function
			if (this.newItemDescription === "") {
				this.addingErrorMessage = "Description is required.";
			} else {
				// get vehicle id
				const vehicleId = parseInt(this.$route.params.id);
				
				// add item to selected list and update that list
				try {
					if (this.selectedList === "breakdowns") {
						await addBreakdown(vehicleId, this.newItemDescription);
						this.vehicle.breakdowns = await getVehicleBreakdowns(vehicleId);
						this.items = this.vehicle.breakdowns;
					} else if (this.selectedList === "damages") {
						await addDamage(vehicleId, this.newItemDescription);
						this.vehicle.damages = await getVehicleDamages(vehicleId);
						this.items = this.vehicle.damages;
					} else if (this.selectedList === "services") {
						await addService(vehicleId, this.newItemDescription);
						this.vehicle.services = await getVehicleServices(vehicleId);
						this.items = this.vehicle.services;
					} else if (this.selectedList === "repairs") {
						await addRepair(vehicleId, this.newItemDescription);
						this.vehicle.repairs = await getVehicleRepairs(vehicleId);
						this.items = this.vehicle.repairs;
					} else if (this.selectedList === "insurances") {
						await addInsurance(vehicleId, this.newItemDescription);
						this.vehicle.insurances = await getVehicleInsurances(vehicleId);
						this.items = this.vehicle.insurances;
					}

					// update page content
					this.isAdding = false;
					this.newItemDescription = "";
				} catch (error) {
					// this.isAdding = false;
					this.addingErrorMessage = error.message;
					this.newItemDescription = "";
				}
			}
		},
		cancelAddingNewItem() {
			this.isAdding = false;
			this.newItemDescription = "";
		},
		addItem() {
			const item = handleAddingItem();
			this.vehicle[selectedList].push(item);
			this.items = this.vehicle[selectedList];
			console.log(this.selectedList);
		},
		handleAddingItem() {
			this.isAdding = true;
		}
	},
	components: {
		EmptyListMessage,
		OwnerItem,
		ListItem,
		ErrorMessage
	},
	props: {
		vehicleId: String
	}
}
</script>

<style scoped>
.vehicles {
	background-color: #FFA69E;
}

.content {
	width: 65%;
	margin-left: auto;
	margin-right: auto;
}

.heading {
	text-align: center;
	margin: 0px;
	padding: 32px;
}

.vehicle-info {
	display: grid;
	grid-template-rows: repeat(5, 1fr);
	gap: 16px;
}

.info-group {
	display: grid;
	grid-template-columns: 1fr 2fr;
	gap: 32px;
}

.label {
	text-align: right;
	line-height: 32px;
}

.info-group-item {
	display: flex;
	flex-direction: row;
	justify-content: right;
}

.info-group-item-changeable {
	display: flex;
	flex-direction: column;
}

.info-group-item-actions {
	display: flex;
	flex-direction: row;
	justify-content: center;
}

.input {
	padding: 8px 16px;
	border: 2px solid black;
	border-radius: 16px;
	background-color: #FF4040;
}

.input:focus{
	outline: none;
}

.input-changeable {
	padding: 8px 16px;
	border: 2px solid black;
	border-radius: 16px;
	background-color: #FF4040;
	width: 100%;
}

.input-changeable:focus{
	outline: none;
}

.input-changeable-link {
	padding: 8px 16px;
	border: 2px solid black;
	border-radius: 16px;
	background-color: #FF4040;
	flex-grow: 1;
}

.button-change {
	font-weight: bold;
	padding: 8px 16px;
	border: 2px solid black;
	border-radius: 16px;
	background-color: #B30303;
	margin-left: 8px;
}

.button-finish-change {
	font-weight: bold;
	padding: 8px 16px;
	border: 2px solid black;
	border-radius: 16px;
	background-color: #B30303;
	margin: 0px 4px;
}

.lists {
	margin-top: 16px;
}

.list-options {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-around;
}

.button-item {
	padding: 8px 16px;
	border-radius: 16px;
	border-width: 0px;
	background-color: #B30303;
	margin: 8px 4px;
}

.active {
	font-weight: bold;
	border: 2px solid black;
}

.list {
	margin-bottom: 16px;
}

.list-new-item {
	display: flex;
	flex-direction: column;
}

.new-item-data {
	display: flex;
	flex-direction: column;
}

.new-item-label {
	text-align: center;
	line-height: 32px;
}

.new-item-input {
	padding: 8px 16px;
	border: 2px solid black;
	border-radius: 16px;
	background-color: #FF4040;
	margin-bottom: 8px;
}

.new-item-input:focus{
	outline: none;
}

.new-item-actions {
	display: flex;
	justify-content: center;
}

.list-button-container {
	margin-top: 24px;
	text-align: center;
}

.button-add {
	font-weight: bold;
	padding: 8px 16px;
	border: 2px solid black;
	border-radius: 16px;
	background-color: #B30303;
}

.button-container {
	margin-top: 32px;
	margin-bottom: 64px;
	text-align: center;
}

.action {
	text-decoration: none;
	text-align: center;
	color: #000000 !important;
	flex-grow: 1;
	display: flex;
	flex-direction: row;
	justify-content: center;
}

.button {
	font-weight: bold;
	padding: 8px 32px;
	border: 2px solid black;
	border-radius: 16px;
	background-color: #B30303;
}

@media (max-width: 700px) {
	.content {
		width: 100%;
		padding: 32px;
	}
}

@media (max-width: 500px) {
	.info-group {
		grid-template-columns: 1fr;
		grid-template-rows: 1fr 1fr;
		gap: 0px;
	}

	.label {
		text-align: center;
	}
}
</style>
