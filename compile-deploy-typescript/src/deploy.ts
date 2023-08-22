import Web3 from 'web3';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.resolve();

// Adjust these paths to match the build directory
const buildPath = path.resolve(__dirname, '../utility/build');
const contractPath = path.join(buildPath, 'utility.json');

// Read ABI and Bytecode
const { abi, bytecode } = JSON.parse(fs.readFileSync(contractPath, 'utf8'));

// Connect to the XDC Apothem Testnet
const web3 = new Web3(process.env.RPC_URL as string);

// Create a new account object from the private key
const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY as string);

// Create a contract object
const contract = new web3.eth.Contract(abi);

async function deployContract() {
  try {
    // Estimate gas for deployment
    const gasEstimate = await contract.deploy({ data: bytecode }).estimateGas();

    // Sign the transaction
    const signedTx = await account.signTransaction({
      data: bytecode,
      gas: gasEstimate,
    });

    // Send the signed transaction
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction!);

    console.log('Contract deployed at address:', receipt.contractAddress);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

deployContract();
