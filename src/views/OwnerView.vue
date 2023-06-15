<template>
	<div class="vehicle">
		<div class="content">
			<h1 class="heading">Owner</h1>
			<h2 class="subheading">{{ this.$route.params.address }}</h2>
			<div class="vehicles">
				<VehicleItem v-for="vehicle in ownerVehicles" v-bind:key="vehicle" :vehicle="vehicle" />
			</div>
			<div class="button-container">
				<button @click="goBack" class="button">BACK</button>
			</div>
		</div>
	</div>
</template>

<script>
import VehicleItem from '@/components/VehicleItem.vue'

export default {
	name: 'OwnerView',
	data() {
		return {
			owner: {
				"address": '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
			},
			ownerVehicles: [
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
	mounted() {
		console.log("OK");
	},
	methods:{
		goBack(){
			this.$router.go(-1);
		}
	},
	components: {
		VehicleItem
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
	padding: 32px 0px 16px 0px;
}

.subheading {
	text-align: center;
	word-break: break-all;
	margin: 0px;
	padding: 16px 0px 32px 0px;
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

.input {
	padding: 8px 16px;
	border: 2px solid black;
	border-radius: 16px;
	background-color: #FF4040;
}

.input:focus{
	outline: none;
}

.button-edit {
	font-weight: bold;
	padding: 8px 16px;
	border: 2px solid black;
	border-radius: 16px;
	background-color: #B30303;
	margin-left: 8px;
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
