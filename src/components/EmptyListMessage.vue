<template>
	<div class="message-container">
		<span class="label">There are no items here...</span>
	</div>
</template>

<script>
export default {
	name: 'EmptyListMessage'
}
</script>

<style scoped>
.message-container {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	text-align: center;
	padding: 4px;
	margin-bottom: 8px;
}

.label {
	padding-bottom: 4px;
	color: #590000;
}
</style>
