<template>
	<div class="message-container">
		<span class="label">{{ message }}</span>
	</div>
</template>

<script>
export default {
	name: 'EmptyListMessage',
	props: {
		message: String
	}
}
</script>

<style scoped>
.message-container {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	text-align: center;
	padding: 16px;
	margin-bottom: 8px;
}

.label {
	font-size: 0.8em;
	padding-bottom: 4px;
	color: #FF4040;
}
</style>
