<template>
	<div class="vehicle">
		<div class="content">
			<h1 class="heading">New vehicle</h1>
			<!-- Form with labels and inputs -->
			<div class="vehicle-info">
				<div class="info-group">
					<span class="label">VIN</span>
					<input v-model="vehicle.vin" type="text" class="input" />
				</div>
				<div class="info-group">
					<span class="label">Make</span>
					<input v-model="vehicle.make" type="text" class="input" />
				</div>
				<div class="info-group">
					<span class="label">Model</span>
					<input v-model="vehicle.model" type="text" class="input" />
				</div>
				<div class="info-group">
					<span class="label">Year</span>
					<input v-model="vehicle.year" type="text" class="input" />
				</div>
			</div>
			<!-- Showing error message -->
			<ErrorMessage :message="errorMessage" v-if="errorMessage !== ''" />
			<!-- Action buttons -->
			<div class="button-container">
				<button @click="saveNewVehicle" class="button">SAVE</button>
				<router-link :to="{ name: 'vehicles' }" class="action">
					<button class="button">CANCEL</button>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import { registerVehicle } from "@/services";
import ErrorMessage from "@/components/ErrorMessage.vue";

export default {
	name: "VehicleNewView",
	data() {
		return {
			vehicle: {
				"vin": "",
				"make": "",
				"model": "",
				"year": ""
			},
			errorMessage: ""
		}
	},
	methods: {
		async saveNewVehicle() {
			// if at least one of the values is empty, show error, otherwise execute function
			if (this.vehicle.vin === "" || this.vehicle.make === "" || this.vehicle.model === "" || this.vehicle.year === "") {
				this.errorMessage = "All values are required.";
			} else {
				console.log("Started saving vehicle...");
				try {
					// make year an integer and make sure it's a number bigger than 0
					this.vehicle.year = parseInt(this.vehicle.year);
					if (isNaN(this.vehicle.year) || (!isNaN(this.vehicle.year) && this.vehicle.year <= 0)) {
						this.vehicle.year = "";
						throw new Error("Year must be a whole number bigger than 0.");
					}

					// register vehicle and change route to list of vehicles
					this.vehicle = await registerVehicle(this.vehicle.vin, this.vehicle.make, this.vehicle.model, this.vehicle.year);
					console.log("Vehicle saved");
					console.log(this.vehicle);
					this.$router.push({ name: 'vehicles' });
				} catch (error) {
					this.errorMessage = error.message;
				}
			}
		}
	},
	components: {
		ErrorMessage
	},
	props: {
		vehicleId: String
	}
}
</script>

<style scoped>
.vehicle {
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
	grid-template-rows: repeat(4, 1fr);
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

.input {
	padding: 8px 16px;
	border: 2px solid black;
	border-radius: 16px;
	background-color: #FF4040;
}

.input:focus{
	outline: none;
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
	margin: 0px 4px;
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
