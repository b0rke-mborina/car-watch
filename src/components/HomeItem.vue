<template>
	<div v-if="!item.isIcons" class="item"
		  :style="{ 'background-color': item.index % 2 === 0 ? '#FFA69E' : '#B30303',
		  				'flex-direction': item.inverted ? 'row-reverse' : 'row' }">
		<div class="content">
			<div class="item-heading">{{ item.heading }}</div>
			<div class="item-text">{{ item.text }}</div>
			<router-link :to="{ name: 'vehicles' }" class="action">
				<button class="button" :style="{ 'background-color': item.index % 2 === 0 ? '#FFA69E' : '#B30303' }">SEE MORE</button>
			</router-link>
		</div>
		<div class="images">
			<img :src="require(`@/assets/icons/${this.item.images[0]}`)" class="image" />
			<img :src="require(`@/assets/icons/${this.item.images[1]}`)" class="image" /> 
		</div>
	</div>
	<div v-else class="item-icons" :style="{ 'background-color': item.index % 2 === 0 ? '#FFA69E' : '#B30303' }">
		<div class="item-heading">Manage many vehicle aspects</div>
		<div class="icons-grid">
			<div v-for="title in item.titles" v-bind:key="title" class="icons-item">
				<div class="item-icon" :style="{ 'background-image': 'url(' + require(`@/assets/icons/${this.item.icons[this.item.titles.indexOf(title)]}`) + ')',
															'background-size': 'cover' }"></div>
				<div class="item-title">{{ title }}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'HomeItem',
	mounted() {
		// console.log(this.item);
		// console.log(this.item.icons[this.item.titles.indexOf("damages")]);
		// @/assets/icons/
		/*
		 :style="{ 'background-image': 'url(' + require(`@/assets/icons/${this.item.icons[this.item.titles.indexOf(title)]}`) + ')',
											  'background-size': 'cover' }"
		 */
		// console.log(this.item.imageURLs[0]);
	},
	props: {
		item: Object
	}
}
</script>

<style scoped>
.item {
	height: 250px;
	width: 100%;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
}

.content {
	width: 50%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 32px;
}

.item-heading {
	margin-bottom: 16px;
	text-align: center;
	font-weight: bold;
	font-size: 1.2em;
}

.item-text {
	text-align: center;
	font-size: 1em;
	white-space: pre;
}

.action {
	margin-top: 8px;
	text-align: center;
	text-decoration: none;
	color: #000000 !important;
}

.button {
	background-color: red;
	border: 2px solid black;
	padding: 8px 16px;
	font-size: 1em;
	font-weight: bold;
	border-radius: 16px;
}

.images {
	height: 186px;
	width: 50%;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-around;
	margin-left: auto;
	margin-right: auto;
	padding: 32px;
}

.image {
	height: 100%;
}

.item-icons {
	height: 250px;
	width: 100%;
	padding: 32px 0px;
}

.item-title {
	text-align: center;
	padding-bottom: 8px;
}

.icons-grid {
	height: 200px;
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr;
	gap: 0px;
	justify-content: space-around;
}

.icons-item {
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 8px;
}

.item-icon {
	width: 67px;
	height: 67px;
	margin-left: auto;
	margin-right: auto;
}

@media (max-width: 750px) {
	.item {
		flex-wrap: wrap;
		height: 329px;
	}

	.content {
		width: 100%;
		padding-bottom: 16px;
	}

	.images {
		height: 90px;
		width: 100%;
		padding-top: 0px;
	}
}

@media (max-width: 400px) {
	.item {
		flex-wrap: wrap;
		height: 381px;
	}
}
</style>
