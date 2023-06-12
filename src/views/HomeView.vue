<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { generateData, getAllVehicles, transferOwnership } from '@/services'

export default {
	name: 'HomeView',
	async mounted() {
		console.log("Generating data...");
		await generateData();
		console.log("Data generated.");

		console.log("Started getter");
		await getAllVehicles();
		console.log("Ended getter");
		// console.log("Started");
		// await transferOwnership(1, "0x70997970C51812dc3A010C7d01b50e0d17dc79C8");
		// console.log("Ended");
	},
	components: {
		HelloWorld
	}
}
</script>
