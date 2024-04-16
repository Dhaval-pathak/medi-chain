var PatientDataManagementSystem = artifacts.require("./PatientDataManagementSystem.sol");

module.exports = function(deployer) {
  const authorizedHospitalAddress = "0xf89f514C36DAe1cfbcABa694647De1f2c3550571"; 
  deployer.deploy(PatientDataManagementSystem, authorizedHospitalAddress);
};
