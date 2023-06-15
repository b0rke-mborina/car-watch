<template>
	<div class="item">
		<div class="item-container">
			<span class="label">Date and time</span>
			<span class="value">{{ timeConverter(owner.timestamp) }}</span>
		</div>
		<div class="item-container">
			<span class="label">Address</span>
			<router-link :to="{ name: 'owner', 'params': { 'address': owner.address } }" class="action">
				<span class="value address">{{ owner.address }}</span>
			</router-link>
		</div>
	</div>
</template>

<script>
export default {
	name: 'OwnerItem',
	methods: {
		timeConverter(unixTimestamp) {
			var unixTimestampMs = new Date(unixTimestamp * 1000);
			var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			var year = unixTimestampMs.getFullYear();
			var month = months[unixTimestampMs.getMonth()];
			var date = unixTimestampMs.getDate();
			var hour = unixTimestampMs.getHours();
			var min = unixTimestampMs.getMinutes();
			var sec = unixTimestampMs.getSeconds();
			var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
			return time;
		}
	},
	props: {
		owner: Object
	}
}
</script>

<style scoped>
.item {
	display: grid;
	grid-template-columns: 1fr 2fr;
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
	text-decoration: none;
	text-align: center;
	color: #000000 !important;
}
</style>
