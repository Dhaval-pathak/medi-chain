// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PatientDataManagementSystem {
    struct Patient {
        uint256 id;
        string name;
        uint256 age;
        string medicalHistory;
        address patientAddress;
        address insuranceCompany;
        uint256[] billIds;
    }

    struct MedicalBill {
        uint256 patientId;
        uint256 billId;
        uint256 amount;
        string description;
        string treatmentDate;
        bool isProcessed;
        address insuranceCompany;
    }

    mapping(uint256 => Patient) patients;
    mapping(uint256 => mapping(uint256 => MedicalBill)) medicalBills;
    address authorizedHospital;
    uint256 patientCounter;
    mapping(uint256 => uint256) billCounters;

    event NewPatient(uint256 id, string name, uint256 age, string medicalHistory, address patientAddress);
    event NewMedicalBill(uint256 patientId, uint256 billId, uint256 amount, string description, string treatmentDate, address insuranceCompany);
    event MedicalBillProcessed(uint256 patientId, uint256 billId);
    event InsuranceCompanyAssigned(uint256 patientId, address insuranceCompany);

    constructor(address _authorizedHospital) {
        authorizedHospital = _authorizedHospital;
    }
    
    function addPatient(string memory _name, uint256 _age, string memory _medicalHistory) public {
        require(msg.sender == authorizedHospital, "Only the authorized hospital can add patients");
        patientCounter++;
        patients[patientCounter] = Patient(patientCounter, _name, _age, _medicalHistory, msg.sender, address(0), new uint256[](0));
        emit NewPatient(patientCounter, _name, _age, _medicalHistory, msg.sender);
    }

    function addMedicalBill(uint256 _patientId, uint256 _amount, string memory _description, string memory _treatmentDate) public {
        require(msg.sender == authorizedHospital, "Only the authorized hospital can add medical bills");
        uint256 billId = billCounters[_patientId] + 1;
        billCounters[_patientId]++;
        medicalBills[_patientId][billId] = MedicalBill(billId, _patientId, _amount, _description, _treatmentDate, false, address(0));
        patients[_patientId].billIds.push(billId);
        emit NewMedicalBill(_patientId, billId, _amount, _description, _treatmentDate, address(0));
    }

    function assignInsuranceCompany(uint256 _patientId, address _insuranceCompany) public {
        patients[_patientId].insuranceCompany = _insuranceCompany;
        // Update insuranceCompany field for all medical bills of the patient
        uint256[] storage billIds = patients[_patientId].billIds;
        for (uint256 i = 0; i < billIds.length; i++) {
            uint256 billId = billIds[i];
            medicalBills[_patientId][billId].insuranceCompany = _insuranceCompany;
        }
        emit InsuranceCompanyAssigned(_patientId, _insuranceCompany);
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
