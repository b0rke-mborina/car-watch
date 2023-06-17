<template>
	<div class="owner">
		<div class="content">
			<!-- Owner data in headings -->
			<h1 class="heading">Owner</h1>
			<h2 class="subheading">{{ this.$route.params.address }}</h2>
			<!-- Owner vehicles list -->
			<div>
				<EmptyListMessage v-if="ownerVehicles.length === 0" />
				<VehicleItem v-for="vehicle in ownerVehicles" v-bind:key="vehicle" :vehicle="vehicle" />
				<ErrorMessage :message="errorMessage" v-if="errorMessage !== ''" />
			</div>
			<!-- Back button -->
			<div class="button-container">
				<button @click="goBack" class="button">BACK</button>
			</div>
		</div>
	</div>
</template>

<script>
import { getOwnerVehicles } from "@/services";
import EmptyListMessage from "@/components/EmptyListMessage.vue";
import VehicleItem from "@/components/VehicleItem.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";

export default {
	name: "OwnerView",
	data() {
		return {
			ownerVehicles: [],
			ownerAddress: "",
			errorMessage: ""
		}
	},
	async mounted() {
		this.ownerAddress = this.$route.params.address;
		console.log("Started getter");
		try {
			this.ownerVehicles = await getOwnerVehicles(this.ownerAddress);
			console.log(this.ownerVehicles);
		} catch (error) {
			this.errorMessage = error.message;
		}
		console.log("Ended getter");
	},
	methods:{
		goBack(){
			this.$router.go(-1);
		}
	},
	components: {
		EmptyListMessage,
		VehicleItem,
		ErrorMessage
	},
	props: {
		vehicleId: String
	}
}
</script>

<style scoped>
.owner {
	background-color: #FFA69E;
}

.content {
	width: 65%;
	margin-left: auto;
	margin-right: auto;
}

.heading {
	text-align: center;
	margin: 0px;
	padding: 32px 0px 16px 0px;
}

.subheading {
	text-align: center;
	word-break: break-all;
	margin: 0px;
	padding: 16px 0px 32px 0px;
}

.button-container {
	margin-top: 32px;
	margin-bottom: 64px;
	text-align: center;
}

.button {
	font-weight: bold;
	padding: 8px 32px;
	border: 2px solid black;
	border-radius: 16px;
	background-color: #B30303;
}

@media (max-width: 700px) {
	.content {
		width: 100%;
		padding: 32px;
	}
}
</style>
