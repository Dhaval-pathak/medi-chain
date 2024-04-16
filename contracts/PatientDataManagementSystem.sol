// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PatientDataManagementSystem {
    struct Patient {
        uint256 id;
        string name;
        uint256 age;
        string mobileNumber;
        string email;
        string bloodGroup;
        string gender;
        string occupation;
        string marriedStatus;
        string medicalHistory;
        address patientAddress;
        address insuranceCompany;
        uint256[] billIds;
    }

    struct MedicalBill {
        uint256 billId;
        uint256 patientId;
        uint256 amount;
        string description;
        string treatmentDate;
        bool isProcessed;
        address insuranceCompany;
    }

    mapping(uint256 => Patient) patients;
    mapping(uint256 => mapping(uint256 => MedicalBill)) medicalBills;
    address authorizedHospital;
    mapping(uint256 => uint256) billCounters;

    event NewPatient(uint256 id, string name, uint256 age, string medicalHistory, address patientAddress);
    event NewMedicalBill(uint256 patientId, uint256 billId, uint256 amount, string description, string treatmentDate, address insuranceCompany);
    event MedicalBillProcessed(uint256 patientId, uint256 billId);
    event InsuranceCompanyAssigned(uint256 patientId, address insuranceCompany);

    constructor(address _authorizedHospital) {
        authorizedHospital = _authorizedHospital;
    }
    
    function addPatient(uint256 _id, string memory _name, string memory _mobile, string memory _email, string memory _bloodGroup,string memory _gender,string memory _occupation, string memory _marriedStatus, uint256 _age, string memory _medicalHistory) public {
        require(msg.sender == authorizedHospital, "Only the authorized hospital can add patients");
        patients[_id] = Patient(_id, _name, _age,_mobile,_email,_bloodGroup,_gender,_occupation,_marriedStatus, _medicalHistory,  msg.sender, address(0), new uint256[](0));
        emit NewPatient(_id, _name, _age, _medicalHistory, msg.sender);
    }

    function addMedicalBill(uint256 _patientId, uint256 _amount, string memory _description, string memory _treatmentDate) public {
        require(msg.sender == authorizedHospital, "Only the authorized hospital can add medical bills");
        uint256 billId = billCounters[_patientId] + 1;
        billCounters[_patientId]++;
        medicalBills[_patientId][billId] = MedicalBill(billId, _patientId, _amount, _description, _treatmentDate, false, address(0));
        patients[_patientId].billIds.push(billId);
        emit NewMedicalBill(_patientId, billId, _amount, _description, _treatmentDate, address(0));
    }

    function assignInsuranceCompany(uint256 _patientId, uint256 billId,  address _insuranceCompany) public {
        if(medicalBills[_patientId][billId].insuranceCompany == address(0)){
            patients[_patientId].insuranceCompany = _insuranceCompany;
            medicalBills[_patientId][billId].insuranceCompany = _insuranceCompany;
            emit InsuranceCompanyAssigned(_patientId, _insuranceCompany);
        }
        else{
            revert("Insurance Company already assigned");
        }
    }

    function processMedicalBill(uint256 _patientId, uint256 _billId) public {
        require(msg.sender == medicalBills[_patientId][_billId].insuranceCompany, "Only the assigned insurance company can process this bill");
        require(medicalBills[_patientId][_billId].isProcessed == false, "Medical bill already processed");
        medicalBills[_patientId][_billId].isProcessed = true;
        emit MedicalBillProcessed(_patientId, _billId);
    }

    function getPatient(uint256 _id) public view returns (Patient memory) {
        return patients[_id];
    }

    function getMedicalBill(uint256 _patientId, uint256 _billId) public view returns (MedicalBill memory) {
        return medicalBills[_patientId][_billId];
    }

    function getAllMedicalRecords(uint256 _patientId) public view returns (MedicalBill[] memory) {
        uint256[] memory billIds = patients[_patientId].billIds;
        MedicalBill[] memory medicalRecords = new MedicalBill[](billIds.length);
        for (uint256 i = 0; i < billIds.length; i++) {
            medicalRecords[i] = medicalBills[_patientId][billIds[i]];
        }
        return medicalRecords;
    }
}