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

export function getVehicle(vehicleId) { // Details
	// TO-DO implement
}

export function registerVehicle(vehicleVin, vehicleMake, vehicleModel, vehicleYear) {
	// TO-DO implement
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

export function addDamage(vehicleId, description) {
	// TO-DO implement
}

export function addService(vehicleId, description) {
	// TO-DO implement
}

export function addRepair(vehicleId, description) {
	// TO-DO implement
}

export function addInsurance(vehicleId, description) {
	// TO-DO implement
}

export function getVehicleBreakdowns(vehicleId) {
	// TO-DO implement
}

export function getVehicleDamages(vehicleId) {
	// TO-DO implement
}

export function getVehicleServices(vehicleId) {
	// TO-DO implement
}

export function getVehicleRepairs(vehicleId) {
	// TO-DO implement
}

export function getVehicleInsurances(vehicleId) {
	// TO-DO implement
}

export function getVehicleOwners(vehicleId) {
	// TO-DO implement
}

export function getOwnerVehicles(ownerAddress) {
	// TO-DO implement
}

export function removeVehicleFromOwner(ownerAddress, vehicleId) {
	// TO-DO implement
}

export function authorizeAddress(address) {
	// TO-DO implement
}

export function revokeAddress(address) {
	// TO-DO implement
}
