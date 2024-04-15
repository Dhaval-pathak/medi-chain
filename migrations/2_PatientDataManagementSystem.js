var PatientDataManagementSystem = artifacts.require("./PatientDataManagementSystem.sol");

module.exports = function(deployer) {
  const authorizedHospitalAddress = "0x173a168E24d9Bd62bAE4874b0b9783279932Ad55"; 
  deployer.deploy(PatientDataManagementSystem, authorizedHospitalAddress);
};
