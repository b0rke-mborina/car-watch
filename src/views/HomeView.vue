<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { transferOwnership } from '@/services'

export default {
	name: 'HomeView',
	mounted() {
		console.log("Started");
		transferOwnership(1, "0xcd3B766CCDd6AE721141F452C550Ca635964ce71")
		console.log("Ended");
	},
	components: {
		HelloWorld
	}
}
</script>
