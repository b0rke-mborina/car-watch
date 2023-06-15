<template>
	<div class="vehicle">
		<div class="content">
			<h1 class="heading">New vehicle</h1>
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
				<div class="info-group">
					<span class="label">Owner address</span>
					<input v-model="vehicle.owner" type="text" class="input" />
				</div>
			</div>
			<ErrorMessage :message="errorMessage" v-if="errorMessage != ''" />
			<div class="button-container">
				<button @click="saveVehicle" class="button">SAVE</button>
				<router-link :to="{ name: 'vehicles', 'params': { 'id': vehicle.id } }" class="action">
					<button class="button">CANCEL</button>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import ErrorMessage from '@/components/ErrorMessage.vue'

export default {
	name: 'VehicleNewView',
	data() {
		return {
			vehicle: {
				"vin": "",
				"make": "",
				"model": "",
				"year": "",
				"owner": ""
			},
			errorMessage: ""
		}
	},
	mounted() {
		console.log("OK");
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

.input-changeable {
	padding: 8px 16px;
	border: 2px solid black;
	border-radius: 16px;
	background-color: #FF4040;
	width: 100%;
}

.input:focus{
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
