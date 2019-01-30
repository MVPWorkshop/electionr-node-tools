'use strict';

const Web3 = require('web3');
const abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "bondPeriod",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x0881123c"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "blockReward",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x0ac168a1"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "validatorElect",
        "outputs": [
            {
                "name": "_sender",
                "type": "address"
            },
            {
                "name": "_hash",
                "type": "bytes32"
            },
            {
                "name": "_validator",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x13912d33"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "finishValidators",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x432ff693"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "periodBlock",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x4834c649"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "cycleValidators",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x7bc8dc88"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "list",
        "outputs": [
            {
                "name": "_next",
                "type": "uint256"
            },
            {
                "name": "_prev",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x80c9419e"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "head",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x8f7dcfa3"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "currValidators",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xb1e5a4dd"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "nextElectionBlockEnd",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xf0874e9d"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "startValidators",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xf234c1bd"
    },
    {
        "inputs": [
            {
                "name": "_startValidators",
                "type": "uint256"
            },
            {
                "name": "_cycleValidators",
                "type": "uint256"
            },
            {
                "name": "_finishValidators",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor",
        "signature": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "validators",
                "type": "uint256[]"
            }
        ],
        "name": "GenesisValidatorSet",
        "type": "event",
        "signature": "0xb7d76b3894174d7538c09a868954ef9f498ad9c1443f0668615942e25e21756e"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "cycle",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "validators",
                "type": "uint256[]"
            }
        ],
        "name": "NewValidatorsSet",
        "type": "event",
        "signature": "0xa093e60eaddf50cf3267ee8bdf1af5ca0414dfb9e3cc93e824512469d218ec26"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_pubKey",
                "type": "uint256"
            },
            {
                "name": "_nonce",
                "type": "uint256"
            },
            {
                "name": "_hash",
                "type": "bytes32"
            }
        ],
        "name": "electMe",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x5999c4bc"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "publishGenesisSigs",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xa3fc0df2"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "publishSigs",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x71e7708a"
    }
];

const logger = require('./logger');

var web3;
var electionContract;

module.exports = {
    sendTransaction,
    initializeProviders,
    checkIfExists
};

function initializeProviders (provider, contract) {
    web3 = new Web3(provider);
    electionContract = new web3.eth.Contract(abi, contract);
}

async function sendTransaction (privateKey, contract, publicKey, nonce, podHash, gasPrice) {
    if (web3) {
        try {
            const account = await web3.eth.accounts.privateKeyToAccount(privateKey);
            const ethNonce = await web3.eth.getTransactionCount(account.address);

            const data = electionContract.methods.electMe(publicKey, nonce, podHash).encodeABI();
            const singedTx = await account.signTransaction({
                to: contract,
                nonce: ethNonce,
                data: data,
                gasPrice: gasPrice,
                gasLimit: 8000000
            });

            return await web3.eth.sendSignedTransaction(singedTx.rawTransaction);
        } catch (err) {
            if (err.stack.includes('revert')) {
                console.log('Lower hash already elected! Lower your starting --hash parametar and start again');
                console.log('Miner will now exit...');
                process.exit(1);
            } else if (err.stack.includes('out of gas')) {
                console.log('Hash submitted is to big for contract to process...');
                console.log(`Try to mine lower hash than ${podHash}!`);
                process.exit(1);
            } else {
                logger.error(err.stack);
            }
        }
    }
}

async function checkIfExists (event) {
    const tx = await web3.eth.getTransactionReceipt(event.transactionHash);
    if (!tx) {
        return false;
    }

    return tx.blockNumber === event.blockNumber;
}