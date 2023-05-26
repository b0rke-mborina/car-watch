import { ethers } from 'ethers';
import contractABI from './contractABI.json';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

// let web3;
// let contractInstance;

const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
const contract = new ethers.Contract(contractAddress, contractABI, provider);

/*export function initializeContract() {
	if (window.ethereum) {
		web3 = new ethers(window.ethereum);
		window.ethereum.enable().catch((error) => {
			// Handle error
			console.error(error);
		});
	} else if (window.web3) {
		web3 = new ethers(window.web3.currentProvider);
	} else {
		// Handle no web3 provider error
		console.error('No web3 provider detected');
	}

	if (web3) {
		contractInstance = new web3.eth.Contract(contractABI, contractAddress);
	}
}*/

export function getVehicleDetails(vehicleId) {
	// TO-DO implement
	// return contractInstance.methods.getVehicle(vehicleId).call();
}

export async function transferOwnership(vehicleId, newOwner) {
	// TO-DO implement
	console.log("OK");
	try {
		const signer = provider.getSigner();
		const contractWithSigner = contract.connect(signer);
		const transaction = await contractWithSigner.transferOwnership(vehicleId, newOwner);
		await transaction.wait();
		console.log(transaction);
	} catch (error) {
		console.error(error);
	}
}

export function addBreakdown(vehicleId, description) {
	// TO-DO implement
}
