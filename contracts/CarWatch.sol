// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract CarWatch {
	struct Vehicle {
		string vin;
		string make;
		string model;
		uint256 year;
		address currentOwner;
		uint256[] breakdowns;
		uint256[] damages;
		uint256[] services;
		uint256[] repairs;
		uint256[] insurances;
		address[] owners;
	}

	struct Item {
		uint256 timestamp;
		string description;
	}

	address private contractOwner;
	mapping(uint256 => Vehicle) private vehicles;
	mapping(uint256 => Item) private breakdowns;
	mapping(uint256 => Item) private damages;
	mapping(uint256 => Item) private services;
	mapping(uint256 => Item) private repairs;
	mapping(uint256 => Item) private insurances;
	mapping(address => uint256[]) private ownerVehicles;
	mapping(address => bool) private authorizedAddresses;
	uint256 private vehicleCount;

	event VehicleRegistered(uint256 indexed vehicleId, string vin, string make, string model, uint256 year, address owner);
	event OwnershipTransferred(uint256 indexed vehicleId, address previousOwner, address newOwner);
	event BreakdownAdded(uint256 indexed vehicleId, string description);
	event DamageAdded(uint256 indexed vehicleId, string description);
	event ServiceAdded(uint256 indexed vehicleId, string description);
	event RepairAdded(uint256 indexed vehicleId, string description);
	event InsuranceAdded(uint256 indexed vehicleId, string description);
	event OwnerAdded(uint256 indexed vehicleId, address owner);
	event AddressAuthorized(address indexed authorizedAddress);
	event AddressRevoked(address indexed authorizedAddress);

	constructor() {
		contractOwner = msg.sender;
		authorizeAddress(contractOwner);
	}

	modifier vehicleExists(uint256 _vehicleId) {
		require(_vehicleId < vehicleCount, "Invalid vehicle ID");
		_;
	}

	modifier requireValidAddress(address _address) {
        require(_address != address(0), "Invalid address");
        _;
    }

    modifier requireDescription(string memory _description) {
        require(bytes(_description).length > 0, "Description is required");
        _;
    }

	modifier onlyOwner(uint256 _vehicleId) {
		Vehicle storage vehicle = vehicles[_vehicleId];
		require(msg.sender == vehicle.currentOwner, "Only the current owner of the vehicle can perform this action");
		_;
	}

	modifier onlyAuthorized() {
		require(authorizedAddresses[msg.sender] || msg.sender == contractOwner, "Only authorized addresses can perform this action");
		_;
	}

	modifier onlyContractOwner() {
		require(msg.sender == contractOwner, "Only the contract owner can perform this action");
		_;
	}

	function getAllVehicles() public view returns (Vehicle[] memory) {
		Vehicle[] memory allVehicles = new Vehicle[](vehicleCount);
		for (uint256 i = 0; i < vehicleCount; i++) {
			allVehicles[i] = vehicles[i];
		}
		return allVehicles;
	}

	function getVehicle(uint256 _vehicleId) public view returns (Vehicle memory, Item[] memory, Item[] memory, Item[] memory, Item[] memory, Item[] memory) { //  string memory, string memory, string memory, uint256, address, uint256[] memory, uint256[] memory, uint256[] memory, uint256[] memory, uint256[] memory) {
		require(_vehicleId < vehicleCount, "Invalid vehicle ID");
		Vehicle storage vehicle = vehicles[_vehicleId];

		Item[] memory breakdownsResult = getVehicleBreakdowns(_vehicleId);
		Item[] memory damagesResult = getVehicleDamages(_vehicleId);
		Item[] memory servicesResult = getVehicleServices(_vehicleId);
		Item[] memory repairsResult = getVehicleRepairs(_vehicleId);
		Item[] memory insurancesResult = getVehicleInsurances(_vehicleId);

		return (vehicle, breakdownsResult, damagesResult, servicesResult, repairsResult, insurancesResult);
	}

	function registerVehicle(string memory _vin, string memory _make, string memory _model, uint256 _year) public {
		require(bytes(_vin).length > 0, "VIN is required");
		require(bytes(_make).length > 0, "Make is required");
		require(bytes(_model).length > 0, "Model is required");
		require(_year > 0, "Year must be greater than 0");

		uint256 vehicleId = vehicleCount;
		vehicles[vehicleId] = Vehicle(_vin, _make, _model, _year, msg.sender, new uint256[](0), new uint256[](0), new uint256[](0), new uint256[](0), new uint256[](0), new address[](0));
		ownerVehicles[msg.sender].push(vehicleId);

		emit VehicleRegistered(vehicleId, _vin, _make, _model, _year, msg.sender);

		vehicleCount++;
	}

	function transferOwnership(uint256 _vehicleId, address _newOwner) public vehicleExists(_vehicleId) requireValidAddress(_newOwner) onlyOwner(_vehicleId) {
		Vehicle storage vehicle = vehicles[_vehicleId];
		require(_newOwner != vehicle.currentOwner, "Ownership cannot be transfered to oneself");
		address previousOwner = vehicle.currentOwner;

		vehicle.currentOwner = _newOwner;
		ownerVehicles[previousOwner] = removeVehicleFromOwner(previousOwner, _vehicleId);
		ownerVehicles[_newOwner].push(_vehicleId);
		vehicle.owners.push(_newOwner);

		emit OwnershipTransferred(_vehicleId, previousOwner, _newOwner);
		emit OwnerAdded(_vehicleId, _newOwner);
	}

	function addBreakdown(uint256 _vehicleId, string memory _description) public vehicleExists(_vehicleId) requireDescription(_description) onlyAuthorized {
		Vehicle storage vehicle = vehicles[_vehicleId];
		vehicle.breakdowns.push(block.timestamp);
		breakdowns[block.timestamp] = Item(block.timestamp, _description);

		emit BreakdownAdded(_vehicleId, _description);
	}

	function addDamage(uint256 _vehicleId, string memory _description) public vehicleExists(_vehicleId) requireDescription(_description) onlyAuthorized {
		Vehicle storage vehicle = vehicles[_vehicleId];
		vehicle.damages.push(block.timestamp);
		damages[block.timestamp] = Item(block.timestamp, _description);

		emit DamageAdded(_vehicleId, _description);
	}

	function addService(uint256 _vehicleId, string memory _description) public vehicleExists(_vehicleId) requireDescription(_description) onlyAuthorized {
		Vehicle storage vehicle = vehicles[_vehicleId];
		vehicle.services.push(block.timestamp);
		services[block.timestamp] = Item(block.timestamp, _description);

		emit ServiceAdded(_vehicleId, _description);
	}

	function addRepair(uint256 _vehicleId, string memory _description) public vehicleExists(_vehicleId) requireDescription(_description) onlyAuthorized {
		Vehicle storage vehicle = vehicles[_vehicleId];
		vehicle.repairs.push(block.timestamp);
		repairs[block.timestamp] = Item(block.timestamp, _description);

		emit RepairAdded(_vehicleId, _description);
	}

	function addInsurance(uint256 _vehicleId, string memory _description) public vehicleExists(_vehicleId) requireDescription(_description) onlyAuthorized {
		Vehicle storage vehicle = vehicles[_vehicleId];
		vehicle.insurances.push(block.timestamp);
		insurances[block.timestamp] = Item(block.timestamp, _description);

		emit InsuranceAdded(_vehicleId, _description);
	}

	function getVehicleBreakdowns(uint256 _vehicleId) public view vehicleExists(_vehicleId) returns (Item[] memory) {
		Vehicle storage vehicle = vehicles[_vehicleId];
		Item[] memory result = new Item[](vehicle.breakdowns.length);
		
		for (uint256 i = 0; i < vehicle.breakdowns.length; i++) {
			result[i] = breakdowns[vehicle.breakdowns[i]];
		}

		return result;
	}

	function getVehicleDamages(uint256 _vehicleId) public view vehicleExists(_vehicleId) returns (Item[] memory) {
		Vehicle storage vehicle = vehicles[_vehicleId];
		Item[] memory result = new Item[](vehicle.damages.length);
		
		for (uint256 i = 0; i < vehicle.damages.length; i++) {
			result[i] = damages[vehicle.damages[i]];
		}

		return result;
	}

	function getVehicleServices(uint256 _vehicleId) public view vehicleExists(_vehicleId) returns (Item[] memory) {
		Vehicle storage vehicle = vehicles[_vehicleId];
		Item[] memory result = new Item[](vehicle.services.length);
		
		for (uint256 i = 0; i < vehicle.services.length; i++) {
			result[i] = services[vehicle.services[i]];
		}

		return result;
	}

	function getVehicleRepairs(uint256 _vehicleId) public view vehicleExists(_vehicleId) returns (Item[] memory) {
		Vehicle storage vehicle = vehicles[_vehicleId];
		Item[] memory result = new Item[](vehicle.repairs.length);
		
		for (uint256 i = 0; i < vehicle.repairs.length; i++) {
			result[i] = repairs[vehicle.repairs[i]];
		}

		return result;
	}

	function getVehicleInsurances(uint256 _vehicleId) public view vehicleExists(_vehicleId) returns (Item[] memory) {
		Vehicle storage vehicle = vehicles[_vehicleId];
		Item[] memory result = new Item[](vehicle.insurances.length);
		
		for (uint256 i = 0; i < vehicle.insurances.length; i++) {
			result[i] = insurances[vehicle.insurances[i]];
		}

		return result;
	}

	function getVehicleOwners(uint256 _vehicleId) public view vehicleExists(_vehicleId) returns (address[] memory) {
		Vehicle storage vehicle = vehicles[_vehicleId];
		return vehicle.owners;
	}

	function getOwnerVehicles(address _owner) public view returns (uint256[] memory) {
		return ownerVehicles[_owner];
	}

	function removeVehicleFromOwner(address _owner, uint256 _vehicleId) private returns (uint256[] memory) {
		uint256[] storage ownerVehicleList = ownerVehicles[_owner];

		for (uint256 i = 0; i < ownerVehicleList.length; i++) {
			if (ownerVehicleList[i] == _vehicleId) {
				if (i != ownerVehicleList.length - 1) {
					ownerVehicleList[i] = ownerVehicleList[ownerVehicleList.length - 1];
				}
				ownerVehicleList.pop();
				break;
			}
		}

		return ownerVehicleList;
	}

	function isAuthorizedAddress(address _address) public view returns (bool) {
		return authorizedAddresses[_address];
	}

	function authorizeAddress(address _address) public onlyContractOwner() requireValidAddress(_address) {
		authorizedAddresses[_address] = true;
		emit AddressAuthorized(_address);
	}

	function revokeAddress(address _address) public onlyContractOwner() requireValidAddress(_address) {
		authorizedAddresses[_address] = false;
		emit AddressRevoked(_address);
	}
}
