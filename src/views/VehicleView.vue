<template>
	<div class="vehicle">
		<div class="content">
			<h1 class="heading">Vehicle {{ this.$route.params.id }}</h1>
			<div class="vehicle-info">
				<ErrorMessage :message="fetchingErrorMessage" v-if="fetchingErrorMessage != ''" />
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
				<div class="info-group">
					<span class="label">Current owner</span>
					<div v-if="isAuthorized" class="info-group-item">
						<input v-model="vehicle.owner" v-if="!isChanging" type="text" readonly class="input-changeable" />
						<input v-model="vehicle.owner" v-if="isChanging" type="text" class="input-changeable" />
						<button v-if="isAuthorized && !isChanging" @click="changeOwner" class="button-change">CHANGE</button>
					</div>
				</div>
				<div class="info-group">
					<span class="label"></span>
					<div v-if="isAuthorized && isChanging" class="info-group-item-changeable">
						<div class="info-group-item-actions">
							<button @click="saveOwner" class="button-finish-change">SAVE</button>
							<button @click="cancelChangingOwner" class="button-finish-change">CANCEL</button>
						</div>
						<ErrorMessage :message="addingErrorMessage" v-if="addingErrorMessage != ''" />
					</div>
				</div>
			</div>
			<div class="lists">
				<div class="list-options">
					<button id="breakdowns" @click="changeItems('breakdowns')"
							  :class="`button-item ${selectedList == 'breakdowns' ? 'active' : ''}`">Breakdowns</button>
					<button id="damages" @click="changeItems('damages')"
							  :class="`button-item ${selectedList == 'damages' ? 'active' : ''}`">Damages</button>
					<button id="services" @click="changeItems('services')"
							  :class="`button-item ${selectedList == 'services' ? 'active' : ''}`">Services</button>
					<button id="repairs" @click="changeItems('repairs')"
							  :class="`button-item ${selectedList == 'repairs' ? 'active' : ''}`">Repairs</button>
					<button id="insurances" @click="changeItems('insurances')"
							  :class="`button-item ${selectedList == 'insurances' ? 'active' : ''}`">Insurances</button>
					<button id="owners" @click="changeItems('owners')"
							  :class="`button-item ${selectedList == 'owners' ? 'active' : ''}`">Owners</button>
				</div>
				<div v-if="selectedList == 'owners'" class="list">
					<OwnerItem v-for="owner in owners" v-bind:key="owner" :owner="owner" />
				</div>
				<div v-else class="list">
					<EmptyListMessage v-if="items.length == 0" />
					<ListItem v-for="item in items" v-bind:key="item" :item="item" />
					<div v-if="isAuthorized && isAdding && selectedList != 'owners'" class="list-new-item">
						<div class="new-item-data">
							<span class="new-item-label">New item description</span>
							<input v-model="newItemDescription" type="text" class="new-item-input" />
						</div>
						<div class="new-item-actions">
							<button @click="saveNewItem" class="button-finish-change">SAVE</button>
							<button @click="cancelAddingNewItem" class="button-finish-change">CANCEL</button>
						</div>
					</div>
				</div>
				<ErrorMessage :message="addingErrorMessage" v-if="addingErrorMessage != '' && isAuthorized" />
				<div class="list-button-container">
					<button id="breakdowns" @click="handleAddingItem" class="button-add">ADD NEW</button>
				</div>
			</div>
			<div class="button-container">
				<router-link :to="{ name: 'vehicles', 'params': { 'id': vehicle.id } }" class="action">
					<button class="button">BACK</button>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import EmptyListMessage from '@/components/EmptyListMessage.vue'
import OwnerItem from '@/components/OwnerItem.vue'
import ListItem from '@/components/ListItem.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'

export default {
	name: 'VehicleView',
	data() {
		return {
			vehicle: {
				"id": 1,
				"vin": "111",
				"make": "222",
				"model": "333",
				"year": "444",
				"owner": "555",
				"breakdowns": [
					{
						"timestamp": 1686763423,
						"description": "it was ericsson"
					},
					{
						"timestamp": 1686763433,
						"description": "ericsson's fault again"
					}
				],
				"damages": [],
				"services": [],
				"repairs": [],
				"insurances": [],
				"owners": [
					{
						"timestamp": 1686763423,
						"address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
					},
					{
						"timestamp": 1686763433,
						"address": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
					}
				]
			},
			items: [],
			owners: [],
			isAuthorized: true,
			selectedList: "breakdowns",
			isChanging: false,
			isAdding: false,
			newItemDescription: "",
			fetchingErrorMessage: "",
			changingErrorMessage: "",
			addingErrorMessage: ""
		}
	},
	mounted() {
		console.log("OK");
		this.vehicle.id = this.$route.params.id;
		this.items = this.vehicle.breakdowns;
		this.owners = this.vehicle.owners;
	},
	methods: {
		changeItems(type) {
			this.items = this.vehicle[type];
			this.selectedList = type;
			this.isAdding = false;
			console.log(this.selectedList);
		},
		changeOwner() {
			this.isChanging = true;
		},
		saveOwner() {
			this.isChanging = false;
		},
		cancelChangingOwner() {
			this.isChanging = false;
		},
		saveNewItem() {
			this.isAdding = false;
			this.newItemDescription = "";
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
