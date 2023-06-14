<template>
	<div class="main">
		<div class="main-head">
			<h1 class="main-heading">Car Watch</h1>
			<h2 class="main-subheading">The most trusted vehicle management blockchain</h2>
		</div>
		<router-link :to="{ name: 'vehicles' }"  class="action">
			<button class="button">See vehicles</button>
		</router-link>
	</div>
	<HomeItem v-for="item in items" v-bind:key="item" :item="item" />
	<div class="footer">
		<span>CarWatch blockchain</span>
		<br>
		<span>2023</span>
	</div>
</template>

<script>
import { generateData, getAllVehicles, transferOwnership } from '@/services'
import HomeItem from '@/components/HomeItem.vue'

export default {
	name: 'HomeView',
	async mounted() {
		console.log("Page loaded.");
	},
	data() {
		return {
			items: [
				{
					index: 0,
					inverted: false,
					isIcons: false,
					heading: "See vehicle history",
					text: "- check vehicle information\n- check vehicle history\n- check vehicle owners\n- check other vehicles from owner",
					icons: [],
					titles: [],
					images: ["history.png", "owner.png"]
				},
				{
					index: 1,
					inverted: true,
					isIcons: false,
					heading: "Certified users can manage vehicles",
					text: "- manage vehicle information\n- update vehicle history\n- update vehicle owners\n- manage vehicle owners",
					icons: [],
					titles: [],
					images: ["certification.png", "manage.png"]
				},
				{
					index: 2,
					inverted: false,
					isIcons: true,
					heading: "",
					text: "",
					icons: ["breakdown.png", "damage.png", "service.jpg", "repair.png", "insurance.jpg", "owner.png"],
					titles: ["Breakdowns", "Damages", "Services", "Repairs", "Insurances", "Owners"],
					images: []
				}
			]
		}
	},
	components: {
		HomeItem
	}
}
</script>

<style scoped>
.main {
	background-color: #FFA69E;
	height: 600px;
	padding: 32px;
	background-image: url("../assets/red-car-vehicle-ferrari-artwork.jpg");
	background-size: cover;
	background-repeat: no-repeat;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	color: black;
}

.main-head {
	width: 67%;
}

.main-heading {
	margin: 0px 0px 16px 0px;
}

.main-subheading {
	margin: 0px;
}

.action {
	text-indent: 100px;
	text-decoration: none;
	color: #000000 !important;
}

.button {
	background-color: #B30303;
	border: 2px solid black;
	padding: 8px 16px;
	font-size: 1em;
	font-weight: bold;
	border-radius: 16px;
}

.footer {
	height: 50px;
	background-color: #B30303ed;
	padding: 16px;
	text-align: center;
}

@media (max-width: 1200px) {
	.main {
		height: 400px;
	}
}

@media (max-width: 800px) {
	.main {
		height: 250px;
	}

	.main-head {
		width: 67%;
	}
}

@media (max-width: 550px) {
	.main {
		height: 200px;
		padding: 16px;
	}

	.main-head {
		width: 67%;
	}

	.main-actions {
		text-indent: 50px;
	}
}

@media (max-width: 400px) {
	.main-head {
		width: 100%;
	}
}
</style>