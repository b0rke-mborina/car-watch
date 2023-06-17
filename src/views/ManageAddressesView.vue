<template>
	<div class="vehicle">
		<div class="content">
			<h1 class="heading">Manage addresses</h1>
			<div class="main-form">
				<div class="form-group">
					<span class="label span-2">Check if address is authorized</span>
					<input v-model="addressCheck" type="text" class="input" />
					<button @click="checkAddressAuthorization" class="button">CHECK</button>
					<span v-if="resultCheck !== ''" class="result span-2">{{ resultCheck }}</span>
					<ErrorMessage :message="errorMessageCheck" v-if="errorMessageCheck !== ''" class="span-2" />
				</div>
				<div class="form-group">
					<span class="label span-2">Authorize address</span>
					<input v-model="addressAuthorize" type="text" class="input" />
					<button @click="authorizeAddressAuthorization" class="button">AUTHORIZE</button>
					<span v-if="resultAuthorize" class="result span-2">Address authorized!</span>
					<ErrorMessage :message="errorMessageAuthorize" v-if="errorMessageAuthorize !== ''" class="span-2" />
				</div>
				<div class="form-group">
					<span class="label span-2">Revoke address authorization</span>
					<input v-model="addressRevoke" type="text" class="input" />
					<button @click="revokeAddressAuthorization" class="button">REVOKE</button>
					<span v-if="resultRevoke" class="result span-2">Address authorization revoked!</span>
					<ErrorMessage :message="errorMessageRevoke" v-if="errorMessageRevoke !== ''" class="span-2" />
				</div>
			</div>
			<div class="button-container">
				<router-link :to="{ name: 'vehicles' }" class="action">
					<button class="button">BACK</button>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import { ethers } from 'ethers';
import { isAuthorizedAddress, authorizeAddress, revokeAddress } from "@/services"
import ErrorMessage from '@/components/ErrorMessage.vue'

export default {
	name: 'ManageAddressesView',
	data() {
		return {
			addressCheck: "",
			addressAuthorize: "",
			addressRevoke: "",
			resultCheck: "",
			resultAuthorize: 0,
			resultRevoke: 0,
			errorMessageCheck: "",
			errorMessageAuthorize: "",
			errorMessageRevoke: ""
		}
	},
	methods: {
		async checkAddressAuthorization() {
			this.clearResultsAndErrors();
			try {
				if (!ethers.utils.isAddress(this.addressCheck)) {
					throw new Error("Address must be valid.");
				}

				const result = await isAuthorizedAddress(this.addressCheck);
				console.log("result");
				console.log(result);
				if (result) this.resultCheck = "Address is authorized.";
				else this.resultCheck = "Address is not authorized.";
			} catch (error) {
				this.errorMessageCheck = error.message;
			}
		},
		async authorizeAddressAuthorization() {
			this.clearResultsAndErrors();
			try {
				if (!ethers.utils.isAddress(this.addressAuthorize)) {
					throw new Error("Address must be valid.");
				}

				await authorizeAddress(this.addressAuthorize);
				this.resultAuthorize = 1;
			} catch (error) {
				this.errorMessageAuthorize = error.message;
			}			
		},
		async revokeAddressAuthorization() {
			this.clearResultsAndErrors();
			try {
				if (!ethers.utils.isAddress(this.addressRevoke)) {
					throw new Error("Address must be valid.");
				}

				await revokeAddress(this.addressRevoke);
				this.resultRevoke = 1;
			} catch (error) {
				this.errorMessageRevoke = error.message;
			}
		},
		clearResultsAndErrors() {
			this.errorMessageCheck = "";
			this.errorMessageAuthorize = "";
			this.errorMessageRevoke = "";
			this.resultCheck = "";
			this.resultAuthorize = 0;
			this.resultRevoke = 0;
		}
	},
	components: {
		ErrorMessage
	},
	props: {
		vehicleId: String
	}
}
</script>

<style scoped>
.vehicles {
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
	padding: 32px;
}

.main-form {
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
}

.form-group {
	display: grid;
	grid-template-columns: 3fr 1fr;
	grid-template-rows: 1fr 1fr;
	margin: 24px 0px;
}

.label {
	line-height: 32px;
}

.span-2 {
	grid-column: span 2;
}

.input {
	padding: 8px 16px;
	border: 2px solid black;
	border-radius: 16px;
	background-color: #FF4040;
}

.input:focus{
	outline: none;
}

.button-container {
	margin-top: 32px;
	margin-bottom: 64px;
	text-align: center;
}

.action {
	text-decoration: none;
	text-align: center;
	color: #000000 !important;
}

.button {
	font-weight: bold;
	padding: 8px 32px;
	border: 2px solid black;
	border-radius: 16px;
	background-color: #B30303;
	margin: 0px 4px;
}

.result {
	text-align: center;
	font-weight: bold;
	padding: 8px 0px;
}

@media (max-width: 700px) {
	.content {
		width: 100%;
		padding: 32px;
	}
}

@media (max-width: 500px) {
	.info-group {
		grid-template-columns: 1fr;
		grid-template-rows: 1fr 1fr;
		gap: 0px;
	}

	.label {
		text-align: center;
	}
}
</style>
