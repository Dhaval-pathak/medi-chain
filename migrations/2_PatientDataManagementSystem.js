var PatientDataManagementSystem = artifacts.require("./PatientDataManagementSystem.sol");

module.exports = function(deployer) {
  const authorizedHospitalAddress = "0x2585FA08aFe1566F3C16fF05DE5001e844c99213"; 
  deployer.deploy(PatientDataManagementSystem, authorizedHospitalAddress);
};
