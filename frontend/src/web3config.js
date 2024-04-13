// import Web3 from 'web3';
// let web3;

//  const initWeb3 = async () => {
   
//     if (window.ethereum) {
//         web3 = new Web3(window.ethereum);
//         try {
//             await window.ethereum.enable(); // Request account access
//             await window.ethereum.request({ method: 'eth_requestAccounts' });
//             const accounts = await web3.eth.getAccounts();
//             const userAddress = accounts[0];
//         } catch (error) {
//             // User denied account access...
//             console.error('User denied account access', error);
//         }
//     } 
//     // Legacy dapp browsers...
//     else if (window.web3) {
//         web3 = new Web3(window.web3.currentProvider);
//     }
//     // Non-dapp browsers...
//     else {
//         console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
//     }
// };

import Web3 from 'web3';

const initWeb3 = async () => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      // Request access to the user's MetaMask account
      await window.ethereum.request({ method: 'eth_requestAccounts' }); 
      return web3;
    } catch (error) {
      console.error('User denied account access');
    }
  } else {
    console.error('No Ethereum provider detected');
  }
};
export { initWeb3 };