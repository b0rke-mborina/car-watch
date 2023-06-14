<template>
	<div class="vehicle">
		<div class="content">
			<h1 class="heading">Vehicle {{ vehicle.id }}</h1>
			<div class="vehicle-info">
				<div class="info-group">
					<span class="label">VIN</span>
					<div class="info-group-item">
						<input type="text" class="input" />
						<button v-if="isAuthorized" class="button-edit">EDIT</button>
					</div>
				</div>
				<div class="info-group">
					<span class="label">Make</span>
					<div class="info-group-item">
						<input type="text" class="input" />
						<button v-if="isAuthorized" class="button-edit">EDIT</button>
					</div>
				</div>
				<div class="info-group">
					<span class="label">Model</span>
					<div class="info-group-item">
						<input type="text" class="input" />
						<button v-if="isAuthorized" class="button-edit">EDIT</button>
					</div>
				</div>
				<div class="info-group">
					<span class="label">Year</span>
					<div class="info-group-item">
						<input type="text" class="input" />
						<button v-if="isAuthorized" class="button-edit">EDIT</button>
					</div>
				</div>
				<div class="info-group">
					<span class="label">Current owner</span>
					<div class="info-group-item">
						<input type="text" class="input" />
						<button v-if="isAuthorized" class="button-edit">EDIT</button>
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
							  :class="`button-item ${selectedList == 'owners' ? 'active' : ''}`">Previous owners</button>
				</div>
				<div class="list">
					<ListItem v-for="item in items" v-bind:key="item" :item="item" />
				</div>
				<div class="list-button-container">
					<button id="breakdowns" @click="changeItems('breakdowns')" class="button-add">ADD NEW</button>
				</div>
			</div>
			<div class="button-container">
				<router-link :to="{ name: 'vehicles' }" class="action">
					<button class="button">BACK</button>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import ListItem from '@/components/ListItem.vue'

export default {
	name: 'VehicleView',
	data() {
		return {
			vehicle: {
				"id": 1,
				"vin": "111",
				"make": "111",
				"model": "111",
				"year": "111",
				"owner": "111",
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
				"owners": []
			},
			items: [],
			isAuthorized: true,
			selectedList: "breakdowns"
		}
	},
	mounted() {
		console.log("OK");
		this.items = this.vehicle.breakdowns;
	},
	methods: {
		changeItems(type) {
			this.items = this.vehicle[type];
			this.selectedList = type;
			console.log(this.selectedList);
		},
		addItem() {
			const item = handleAddingItem();
			this.vehicle[selectedList].push(item);
			this.items = this.vehicle[selectedList];
			console.log(this.selectedList);
		},
		handleAddingItem() {
			console.log("implement this");
		}
	},
	components: {
		ListItem
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

.input {
	padding: 8px 16px;
	border: 2px solid black;
	border-radius: 16px;
	background-color: #FF4040;
	width: 100%;
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
