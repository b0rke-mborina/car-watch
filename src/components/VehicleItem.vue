<template>
	<div class="item">
		<div class="item-container">
			<span class="label">VIN</span>
			<span class="value">{{ vehicle.vin }}</span>
		</div>
		<div class="item-container">
			<span class="label">Make and model</span>
			<span class="value">{{ vehicle.make }} {{ vehicle.model }}</span>
		</div>
		<div class="item-container">
			<span class="label">Year</span>
			<span class="value">{{ vehicle.year }}</span>
		</div>
		<div class="item-container">
			<span class="label">Current owner</span>
			<span class="value">{{ vehicle.owner }}</span>
		</div>
		<router-link :to="{ name: 'vehicle', 'params': { 'id': 1 } }" class="item-container action">
			<button class="button">MORE</button>
		</router-link>
	</div>
</template>

<script>
export default {
	name: 'VehicleItem',
	props: {
		vehicle: Object
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	padding: 16px;
	margin-bottom: 8px;
	border: 2px solid black;
	border-radius: 16px;
	background-color: #FF4040;
}

.item-container {
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: center;
	text-align: center;
}

.label {
	font-size: 0.8em;
	padding-bottom: 4px;
	color: #590000;
}

.value {
	padding: 0px 16px;
}

.action {
	align-items: center;
	text-decoration: none;
	color: #000000 !important;
}

.button {
	width: 110px;
	font-weight: bold;
	padding: 8px;
	border: 2px solid black;
	border-radius: 16px;
	background-color: #B30303;
}

@media (max-width: 550px) {
	.item {
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(3, 1fr);
		gap: 8px;
	}

	.action {
		grid-column: span 2;
	}

	.button {
		width: 180px;
	}
}
</style>
