<template>
	<div class="vehicles">
		<div class="content">
			<h1 class="heading">Vehicles</h1>
			<div class="actions-container">
				<!-- Search bar -->
				<div class="search">
					<img :src="require(`@/assets/icons/search.png`)" class="search-icon" />
					<input v-model="searchString" @change="updateVehicleList" type="text" class="input" />
				</div>
				<!-- Action button links -->
				<div class="buttons">
					<router-link :to="{ name: 'vehicleNew' }" class="action-button">
						<button class="button">ADD NEW</button>
					</router-link>
					<router-link :to="{ name: 'home' }" class="action-button">
						<button class="button">BACK</button>
					</router-link>
				</div>
			</div>
			<!-- Manage addresses action button links -->
			<div v-if="auth.isOwner" class="button-container">
				<router-link :to="{ name: 'manageAddresses' }">
					<button class="button">MANAGE ADDRESSES</button>
				</router-link>
			</div>
			<!-- List of vehicles -->
			<div class="list">
				<EmptyListMessage v-if="vehicles.length === 0" />
				<VehicleItem v-for="vehicle in vehicles" v-bind:key="vehicle" :vehicle="vehicle"/>
				<ErrorMessage :message="errorMessage" v-if="errorMessage !== ''" />
			</div>
		</div>
	</div>
</template>

<script>
import { generateData, getAllVehicles, transferOwnership, Auth } from "@/services";
import EmptyListMessage from "@/components/EmptyListMessage.vue";
import VehicleItem from "@/components/VehicleItem.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";

export default {
	name: "VehiclesView",
	data() {
		return {
			vehicles: [],
			vehiclesStorage: [],
			searchString: "",
			errorMessage: "",
			auth: Auth.state
		}
	},
	async mounted() {
		// console.log("Generating data...");
		// await generateData();
		// console.log("Data generated.");

		console.log("Started getter");
		try {
			this.vehicles = await getAllVehicles();
			this.vehiclesStorage = this.vehicles;
			console.log(this.vehicles);
		} catch (error) {
			this.errorMessage = error.message;
		}
		console.log("Ended getter");

		// console.log("Started");
		// await transferOwnership(1, "0x70997970C51812dc3A010C7d01b50e0d17dc79C8");
		// console.log("Ended");
	},
	methods: {
		updateVehicleList() {
			// if search string is empty, add all vehicles to list, otherwise filter vehicles
			if (this.searchString.trim() === "") {
				this.vehicles = this.vehiclesStorage;
			} else {
				// create array of keywords from search string
				let keywords = this.searchString.toLowerCase().split(" ").filter(str => str !== "");
			
				// make new array of vehicles
				let result = [];
				this.vehiclesStorage.forEach(vehicle => {
					// values which are filtered by
					let objectValuesList = [
						vehicle.vin.toLowerCase(), vehicle.make.toLowerCase(), vehicle.model.toLowerCase(),
						vehicle.year.toString(), vehicle.currentOwner
					];

					// filter velues using helper function
					let valuesList = objectValuesList.filter(value => this.includesKeyword(value, keywords));
					
					// if any value has any keyword, add vehicle to list
					if (valuesList.length > 0) result.push(vehicle);
				});

				// set filtered vehicles
				this.vehicles = result;
			}
		},
		includesKeyword(item, keywords) {
			if (typeof keywords === "string") return item.includes(keywords);
			else return keywords.some(keyword => item.includes(keyword));
		}
	},
	components: {
		EmptyListMessage,
		VehicleItem,
		ErrorMessage
	},
	props: {
		msg: String
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

.actions-container {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 16px;
	margin-bottom: 16px;
	text-align: center;
}

.search {
	display: flex;
	flex-direction: row;
	text-decoration: none;
	text-align: left;
	color: #000000 !important;
	width: 50%;
}

.search-icon {
	height: 24px;
	width: 24px;
	margin: 6px 0px;
	padding-right: 4px;
}

.input {
	padding: 8px 16px;
	border: 2px solid black;
	border-radius: 16px;
	background-color: #FF4040;
	margin-bottom: 16px;
}

.input:focus{
	outline: none;
}

.buttons {
	text-decoration: none;
	text-align: right;
	color: #000000 !important;
	width: 50%;
}

.action-button {
	margin-left: 8px;
}

.button {
	font-weight: bold;
	padding: 8px 32px;
	border: 2px solid black;
	border-radius: 16px;
	background-color: #B30303;
	margin-bottom: 16px;
}

.button-container {
	display: flex;
	flex-direction: row;
	justify-content: right;
	margin-top: 16px;
}

.list {
	margin-bottom: 64px;
}

@media (max-width: 1000px) {
	.content {
		width: 80%;
		padding: 32px;
	}
}

@media (max-width: 700px) {
	.content {
		width: 100%;
		padding: 32px;
	}
}

@media (max-width: 600px) {
	.actions-container {
		flex-direction: column;
	}

	.search {
		width: 100%;
		text-align: center;
	}

	.input {
		width: 80%;
	}

	.buttons {
		width: 100%;
		text-align: center;
	}
}

@media (max-width: 400px) {
	.content {
		width: 100%;
		padding: 16px;
	}
}
</style>
