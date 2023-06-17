import { ethers } from "ethers";
import contractABI from "./contractABI.json";

// contract connection configuration
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
const contract = new ethers.Contract(contractAddress, contractABI, provider);

export async function getAllVehicles() {
	try {
		let vehicles = await contract.getAllVehicles();
		console.log(vehicles);

		// add index as id to vehicles
		vehicles = vehicles.map(vehicle => ({...vehicle, "id": vehicles.indexOf(vehicle)}));
		
		return vehicles;
	} catch (error) {
		throw new Error(error.message);
	}
}

export async function getVehicle(vehicleId) {
	try {
		let data = await contract.getVehicle(vehicleId);
		console.log(data);

		// add list data to objects
		let vehicle = { ...data[0] };
		vehicle.breakdowns = [...data[1]];
		vehicle.damages = [...data[2]];
		vehicle.services = [...data[3]];
		vehicle.repairs = [...data[4]];
		vehicle.insurances = [...data[5]];
		console.log(vehicle);

		return vehicle;
	} catch (error) {
		throw new Error(error.message);
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
		throw new Error(error.message);
	}
}

export async function transferOwnership(vehicleId, newOwner) {
	try {
		const signer = provider.getSigner();
		console.log("signer");
		console.log(signer);
		const contractWithSigner = contract.connect(signer);
		const transaction = await contractWithSigner.transferOwnership(vehicleId, newOwner);
		await transaction.wait();
		console.log(transaction);
	} catch (error) {
		throw new Error(error.message);
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
		throw new Error(error.message);
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
		throw new Error(error.message);
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
		throw new Error(error.message);
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
		throw new Error(error.message);
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
		throw new Error(error.message);
	}
}

export async function getVehicleBreakdowns(vehicleId) {
	try {
		const vehicleBreakdowns = await contract.getVehicleBreakdowns(vehicleId);
		console.log(vehicleBreakdowns);
		return vehicleBreakdowns;
	} catch (error) {
		throw new Error(error.message);
	}
}

export async function getVehicleDamages(vehicleId) {
	try {
		const vehicleDamages = await contract.getVehicleDamages(vehicleId);
		console.log(vehicleDamages);
		return vehicleDamages;
	} catch (error) {
		throw new Error(error.message);
	}
}

export async function getVehicleServices(vehicleId) {
	try {
		const vehicleServices = await contract.getVehicleServices(vehicleId);
		console.log(vehicleServices);
		return vehicleServices;
	} catch (error) {
		throw new Error(error.message);
	}
}

export async function getVehicleRepairs(vehicleId) {
	try {
		const vehicleRepairs = await contract.getVehicleRepairs(vehicleId);
		console.log(vehicleRepairs);
		return vehicleRepairs;
	} catch (error) {
		throw new Error(error.message);
	}
}

export async function getVehicleInsurances(vehicleId) {
	try {
		const vehicleInsurances = await contract.getVehicleInsurances(vehicleId);
		console.log(vehicleInsurances);
		return vehicleInsurances;
	} catch (error) {
		console.error(error);
	}
}

export async function getVehicleOwners(vehicleId) {
	try {
		const vehicleOwners = await contract.getVehicleOwners(vehicleId);
		console.log(vehicleOwners);
		return vehicleOwners;
	} catch (error) {
		throw new Error(error.message);
	}
}

export async function getOwnerVehicles(ownerAddress) {
	try {
		let ownerVehicles = await contract.getOwnerVehicles(ownerAddress);
		console.log(ownerVehicles);
		
		// add index as id to vehicles
		ownerVehicles = ownerVehicles.map(vehicle => ({...vehicle, "id": ownerVehicles.indexOf(vehicle)}));
		
		return ownerVehicles;
	} catch (error) {
		throw new Error(error.message);
	}
}

export async function isContractOwner(address) {
	try {
		const isContractOwner = await contract.isContractOwner(address);
		console.log(isContractOwner);
		return isContractOwner;
	} catch (error) {
		throw new Error(error.message);
	}
}

export async function isAuthorizedAddress(address) {
	try {
		const isAuthorized = await contract.isAuthorizedAddress(address);
		console.log(isAuthorized);
		return isAuthorized;
	} catch (error) {
		throw new Error(error.message);
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
		throw new Error(error.message);
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
		throw new Error(error.message);
	}
}

export async function generateData() {
	try {
		const signer = provider.getSigner();
		const contractWithSigner = contract.connect(signer);
		let transaction = await contractWithSigner.registerVehicle("111111", "Ferrari", "458 Italia", 2010);
		transaction = await contractWithSigner.registerVehicle("222222", "Lamborghini", "Gallardo", 2012);
		transaction = await contractWithSigner.registerVehicle("333333", "Skoda", "Fabia", 2008);
		// transaction = await contractWithSigner.transferOwnership(1, signer._address);
		// transaction = await contractWithSigner.transferOwnership(2, signer._address);
		transaction = await contractWithSigner.addBreakdown(1, "Something broke");
		transaction = await contractWithSigner.addDamage(1, "I crashed it");
		transaction = await contractWithSigner.addService(2, "Dosao na popravak");
		transaction = await contractWithSigner.addRepair(2, "Popravljen, kao novi je");
		transaction = await contractWithSigner.addInsurance(1, "Protiv razbijanja, vrijedi 2 godine");
		// transaction = await contractWithSigner.authorizeAddress(0xC5a4ACCa9d971D6a7eC3b67c95e09dCc384C89dB);
		await transaction.wait();
		console.log(transaction);
	} catch (error) {
		throw new Error(error.message);
	}
}


export let Auth = {
	async isAuthorized() {
		// get address
		const address = await provider.getSigner().getAddress();
		console.log("address");
		console.log(address);

		// check if address is authorized
		const result = await isAuthorizedAddress(address);
		console.log("result");
		console.log(result);
		return result;
	},
	async isContractOwner() {
		// get address
		const address = await provider.getSigner().getAddress();
		console.log("address");
		console.log(address);

		// check if address is contract owner
		const result = await isContractOwner(address);
		console.log("result");
		console.log(result);
		return result;
	},
	state: {
		get authorized() {
			return Auth.isAuthorized();
		},
		get isOwner() {
			return Auth.isContractOwner();
		}
	}
};
