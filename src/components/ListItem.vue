<template>
	<div class="item">
		<!-- Item time and date -->
		<div class="item-container">
			<span class="label">Date and time</span>
			<span class="value">{{ timeConverter(item.timestamp) }}</span>
		</div>
		<!-- Item description -->
		<div class="item-container">
			<span class="label">Description</span>
			<span class="value">{{ item.description }}</span>
		</div>
	</div>
</template>

<script>
export default {
	name: "ListItem",
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
			var time = date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec ;
			return time;
		}
	},
	props: {
		item: Object
	}
}
</script>

<style scoped>
.item {
	display: grid;
	grid-template-columns: 1fr 3fr;
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
</style>
