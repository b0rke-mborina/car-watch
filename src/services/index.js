import { ethers } from 'ethers';
import contractABI from './contractABI.json';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
const contract = new ethers.Contract(contractAddress, contractABI, provider);

export async function getAllVehicles() {
	try {
		const vehicles = await contract.getAllVehicles();
		console.log(vehicles);
	} catch (error) {
		console.error(error);
	}
}

export async function getVehicle(vehicleId) {
	try {
		const vehicle = await contract.getVehicle(vehicleId);
		console.log(vehicle);
	} catch (error) {
		console.error(error);
	}
}

export async function registerVehicle(vehicleVin, vehicleMake, vehicleModel, vehicleYear) {
	try {
		const signer = provider.getSigner();
		const contractWithSigner = contract.connect(signer);
		const transaction = await contractWithSigner.registerVehicle(vehicleVin, vehicleMake, vehicleModel, vehicleYear);
		await transaction.wait();
		console.log(transaction);
	} catch (error) {
		console.error(error);
	}
}

export async function transferOwnership(vehicleId, newOwner) {
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

export async function addBreakdown(vehicleId, description) {
	try {
		const signer = provider.getSigner();
		const contractWithSigner = contract.connect(signer);
		const transaction = await contractWithSigner.addBreakdown(vehicleId, description);
		await transaction.wait();
		console.log(transaction);
	} catch (error) {
		console.error(error);
	}
}

export async function addDamage(vehicleId, description) {
	try {
		const signer = provider.getSigner();
		const contractWithSigner = contract.connect(signer);
		const transaction = await contractWithSigner.addDamage(vehicleId, description);
		await transaction.wait();
		console.log(transaction);
	} catch (error) {
		console.error(error);
	}
}

export async function addService(vehicleId, description) {
	try {
		const signer = provider.getSigner();
		const contractWithSigner = contract.connect(signer);
		const transaction = await contractWithSigner.addService(vehicleId, description);
		await transaction.wait();
		console.log(transaction);
	} catch (error) {
		console.error(error);
	}
}

export async function addRepair(vehicleId, description) {
	try {
		const signer = provider.getSigner();
		const contractWithSigner = contract.connect(signer);
		const transaction = await contractWithSigner.addRepair(vehicleId, description);
		await transaction.wait();
		console.log(transaction);
	} catch (error) {
		console.error(error);
	}
}

export async function addInsurance(vehicleId, description) {
	try {
		const signer = provider.getSigner();
		const contractWithSigner = contract.connect(signer);
		const transaction = await contractWithSigner.addInsurance(vehicleId, description);
		await transaction.wait();
		console.log(transaction);
	} catch (error) {
		console.error(error);
	}
}

export async function getVehicleBreakdowns(vehicleId) {
	try {
		const vehicleBreakdowns = await contract.getVehicleBreakdowns(vehicleId);
		console.log(vehicleBreakdowns);
	} catch (error) {
		console.error(error);
	}
}

export async function getVehicleDamages(vehicleId) {
	try {
		const vehicleDamages = await contract.getVehicleDamages(vehicleId);
		console.log(vehicleDamages);
	} catch (error) {
		console.error(error);
	}
}

export async function getVehicleServices(vehicleId) {
	try {
		const vehicleServices = await contract.getVehicleServices(vehicleId);
		console.log(vehicleServices);
	} catch (error) {
		console.error(error);
	}
}

export async function getVehicleRepairs(vehicleId) {
	try {
		const vehicleRepairs = await contract.getVehicleRepairs(vehicleId);
		console.log(vehicleRepairs);
	} catch (error) {
		console.error(error);
	}
}

export async function getVehicleInsurances(vehicleId) {
	try {
		const vehicleInsurances = await contract.getVehicleInsurances(vehicleId);
		console.log(vehicleInsurances);
	} catch (error) {
		console.error(error);
	}
}

export async function getVehicleOwners(vehicleId) {
	try {
		const vehicleOwners = await contract.getVehicleOwners(vehicleId);
		console.log(vehicleOwners);
	} catch (error) {
		console.error(error);
	}
}

export async function getOwnerVehicles(ownerAddress) {
	try {
		const ownerVehicles = await contract.getOwnerVehicles(ownerAddress);
		console.log(ownerVehicles);
	} catch (error) {
		console.error(error);
	}
}

export async function removeVehicleFromOwner(ownerAddress, vehicleId) {
	try {
		const signer = provider.getSigner();
		const contractWithSigner = contract.connect(signer);
		const transaction = await contractWithSigner.removeVehicleFromOwner(ownerAddress, vehicleId);
		await transaction.wait();
		console.log(transaction);
	} catch (error) {
		console.error(error);
	}
}

export async function authorizeAddress(address) {
	try {
		const signer = provider.getSigner();
		const contractWithSigner = contract.connect(signer);
		const transaction = await contractWithSigner.authorizeAddress(address);
		await transaction.wait();
		console.log(transaction);
	} catch (error) {
		console.error(error);
	}
}

export async function revokeAddress(address) {
	try {
		const signer = provider.getSigner();
		const contractWithSigner = contract.connect(signer);
		const transaction = await contractWithSigner.revokeAddress(address);
		await transaction.wait();
		console.log(transaction);
	} catch (error) {
		console.error(error);
	}
}
