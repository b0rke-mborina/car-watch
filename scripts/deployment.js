const hre = require('hardhat');

async function deploy() {
	const CarWatch = await hre.ethers.getContractFactory('CarWatch');
	const carWatch = await CarWatch.deploy();
	await carWatch.deployed();

	console.log('CarWatch deployed to:', carWatch.address);
}

async function main() {
	try {
		await deploy();
		process.exit(0);
	} catch (e) {
		console.error(e);
		process.exit(0);
	}
}

main();
