<template>
	<div class="item">
		<div class="item-container">
			<span class="label">Owner address</span>
			<span class="value address">{{ owner }}</span>
		</div>
		<router-link :to="{ name: 'owner', 'params': { 'address': owner } }" class="item-container action">
			<button class="button">MORE</button>
		</router-link>
	</div>
</template>

<script>
export default {
	name: 'OwnerItem',
	props: {
		owner: String
	}
}
</script>
	
<style scoped>
.item {
	display: grid;
	grid-template-columns: 2fr 1fr;
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

.address {
	word-break: break-all;
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
</style>
