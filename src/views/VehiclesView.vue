<template>
	<div class="vehicles">
		<div class="content">
			<h1 class="heading">This is an vehicle page</h1>
			<VehicleItem v-for="vehicle in vehicles" v-bind:key="vehicle" :vehicle="vehicle"/>
			<div class="button-container">
				<router-link :to="{ name: 'home' }" class="action">
					<button class="button">BACK</button>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import VehicleItem from '@/components/VehicleItem.vue'

export default {
	name: 'VehicleView',
	async mounted() {
		console.log("Generating data...");
		// await generateData();
		console.log("Data generated.");

		console.log("Started getter");
		// await getAllVehicles();
		console.log("Ended getter");
		console.log("Started getter");
		// await getVehicle(1);
		console.log("Ended getter");
		// console.log("Started");
		// await transferOwnership(1, "0x70997970C51812dc3A010C7d01b50e0d17dc79C8");
		// console.log("Ended");
	},
	data() {
		return {
			vehicles: [
				{
					"vin": "111",
					"make": "111",
					"model": "111",
					"year": "111",
					"owner": "111",
				},
				{
					"vin": "111",
					"make": "111",
					"model": "111",
					"year": "111",
					"owner": "111",
				},
				{
					"vin": "111",
					"make": "111",
					"model": "111",
					"year": "111",
					"owner": "111",
				},
				{
					"vin": "111",
					"make": "111",
					"model": "111",
					"year": "111",
					"owner": "111",
				},
				{
					"vin": "111",
					"make": "111",
					"model": "111",
					"year": "111",
					"owner": "111",
				},
				{
					"vin": "111",
					"make": "111",
					"model": "111",
					"year": "111",
					"owner": "111",
				},
				{
					"vin": "111",
					"make": "111",
					"model": "111",
					"year": "111",
					"owner": "111",
				},
				{
					"vin": "111",
					"make": "111",
					"model": "111",
					"year": "111",
					"owner": "111",
				}
			]
		}
	},
	components: {
		VehicleItem
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
	padding: 8px;
	border: 2px solid black;
	border-radius: 16px;
	background-color: #B30303;
}

@media (max-width: 1000px) {
	.content {
		width: 85%;
		padding: 32px;
	}
}

@media (max-width: 700px) {
	.content {
		width: 100%;
		padding: 32px;
	}
}

@media (max-width: 400px) {
	.content {
		width: 100%;
		padding: 16px;
	}
}
</style>
