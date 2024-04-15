import { initWeb3 } from '../web3config'; // Import the initWeb3 function from your web3 utility file
// Contract ABI and deployed contract address (you can get these from the Truffle migration output)
const contractABI =[
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_authorizedHospital",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "patientId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "insuranceCompany",
        "type": "address"
      }
    ],
    "name": "InsuranceCompanyAssigned",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "patientId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "billId",
        "type": "uint256"
      }
    ],
    "name": "MedicalBillProcessed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "patientId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "billId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "treatmentDate",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "insuranceCompany",
        "type": "address"
      }
    ],
    "name": "NewMedicalBill",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "age",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "medicalHistory",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "patientAddress",
        "type": "address"
      }
    ],
    "name": "NewPatient",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_age",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_medicalHistory",
        "type": "string"
      }
    ],
    "name": "addPatient",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_patientId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_treatmentDate",
        "type": "string"
      }
    ],
    "name": "addMedicalBill",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_patientId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_insuranceCompany",
        "type": "address"
      }
    ],
    "name": "assignInsuranceCompany",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_patientId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_billId",
        "type": "uint256"
      }
    ],
    "name": "processMedicalBill",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getPatient",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "age",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "medicalHistory",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "patientAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "insuranceCompany",
            "type": "address"
          },
          {
            "internalType": "uint256[]",
            "name": "billIds",
            "type": "uint256[]"
          }
        ],
        "internalType": "struct PatientDataManagementSystem.Patient",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_patientId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_billId",
        "type": "uint256"
      }
    ],
    "name": "getMedicalBill",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "billId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "patientId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "treatmentDate",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "isProcessed",
            "type": "bool"
          },
          {
            "internalType": "address",
            "name": "insuranceCompany",
            "type": "address"
          }
        ],
        "internalType": "struct PatientDataManagementSystem.MedicalBill",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_patientId",
        "type": "uint256"
      }
    ],
    "name": "getAllMedicalRecords",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "billId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "patientId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "treatmentDate",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "isProcessed",
            "type": "bool"
          },
          {
            "internalType": "address",
            "name": "insuranceCompany",
            "type": "address"
          }
        ],
        "internalType": "struct PatientDataManagementSystem.MedicalBill[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
const contractAddress = '0x9D31Da5A5d0C17434A9aD30b48035461A5B5528B'; // Paste the deployed contract address here

export async function addMedicalBillToBlock(name, age, medicalHistory, billAmount, billDescription, treatmentDate) {
  const web3 = await initWeb3(); // Initialize Web3 with the user's Ethereum provider (e.g., Metamask)
  const accounts = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  await contract.methods.addMedicalBill(1, billAmount, billDescription, "date").send({ from: accounts[0] });
}


export async function getAllMedicalRecords(patientId) {
  try {
      const web3 = await initWeb3();
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      const records = await contract.methods.getAllMedicalRecords(patientId).call();
      return records;
  } catch (error) {
      console.error('Error fetching all medical records:', error);
      throw error;
  }
}


export async function addPatientToBlock(formData) {
  const web3 = await initWeb3(); // Initialize Web3 with the user's Ethereum provider (e.g., Metamask)
  const accounts = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  const { firstName, lastName, id, mobileNo, email, bloodGroup, occupation, maritalStatus, dateOfBirth, patientHistory, sex } = formData;
  await contract.methods.addPatient(firstName,mobileNo,patientHistory).send({ from: accounts[0] });
}

export async function getMedicalBillWithBillID(patiendId,billId){
  try {
    const web3 = await initWeb3();
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const records = await contract.methods.getMedicalBill(patiendId,billId).call();
    return records;
} catch (error) {
    console.error('Error fetching all medical records:', error);
    throw error;
}
}

export async function assignInsuranceCompanyToBlock(patiendId,insuranceCompanyAddress){
  const web3 = await initWeb3(); 
  const accounts = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  await contract.methods.assignInsuranceCompany(patiendId,insuranceCompanyAddress).send({ from: accounts[0] });
}

export async function processMedicalBillToBlock(patiendId,billId){
  const web3 = await initWeb3(); 
  const accounts = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  await contract.methods.processMedicalBill(patiendId,billId).send({ from: accounts[0] });
}

export async function getPatientDetailFromBlock(patiendId){
  try {
    const web3 = await initWeb3();
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const records = await contract.methods.getPatient(patiendId).call();
    return records;
} catch (error) {
    console.error('Error fetching all medical records:', error);
    throw error;
}
}
