import { initWeb3 } from '../web3config'; // Import the initWeb3 function from your web3 utility file

// Contract ABI and deployed contract address (you can get these from the Truffle migration output)
const contractABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "username",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "email",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "role",
          "type": "string"
        }
      ],
      "name": "UserRegistered",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "users",
      "outputs": [
        {
          "internalType": "string",
          "name": "username",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "email",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "password",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "role",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_username",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_email",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_password",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_role",
          "type": "string"
        }
      ],
      "name": "registerUser",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_userAddress",
          "type": "address"
        }
      ],
      "name": "getUserData",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ]; // Paste the contract ABI here
const contractAddress = '0xb55Ea7AEE75827d12E761e5482FA481EC9679bbC'; // Paste the deployed contract address here

export async function registerUserWeb3(username, email, password, role) {
  const web3 = await initWeb3(); // Initialize Web3 with the user's Ethereum provider (e.g., Metamask)
  const accounts = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  await contract.methods.registerUser(username, email, password, role).send({ from: accounts[0] });
}

export async function getUserData(userAddress) {
  const web3 = await initWeb3();
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  const userData = await contract.methods.getUserData(userAddress).call();
  return userData;
}



// try {
//   await registerUserWeb3(username, email, password, role);
//   // Handle success
//   console.log('registration succesful')
// } catch (error) {
//   // Handle error
//   console.log('registration failed')

// }
// };

// const handleGetUserData = async () => {
// try {
//   const web3=await initWeb3();
//   const userAddress = await web3.eth.getAccounts();
//   const data = await getUserData(userAddress[0]);
//   // setUserData(data);
//   console.log(data)
  
// } catch (error) {
//   // Handle error
// }
