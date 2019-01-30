'use strict';

const Queue = require('better-queue');
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
]; // @TODO: seperate file

const cosmos = require('./cosmos');
const logger = require('./logger');
const transactions = require('./transactions');

const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

let web3;
let electionContract;

const queue = new Queue(async (args, cb) => {
    const { event, publicKey, legalerNodeUrl } = args;
    await cosmosTxHandler(event, publicKey, legalerNodeUrl);
    cb();
}, {
    concurrent: 1
});

module.exports = {
    initializeWatcher,
    start,
};

function initializeWatcher (provider, contract) {
    web3 = new Web3(new Web3.providers.WebsocketProvider(provider));
    electionContract = new web3.eth.Contract(abi, contract);

    transactions.initializeProviders(provider, contract);
}

async function start (publicKey, legalerNodeUrl, blocknumber, contract, provider) {
    web3 = new Web3(new Web3.providers.WebsocketProvider(provider));
    electionContract = new web3.eth.Contract(abi, contract);

    transactions.initializeProviders(provider, contract);

    logger.info(`Started watching transaction from ethereum node from block: ${blocknumber}`);

    electionContract.getPastEvents('GenesisValidatorSet', {
        fromBlock: +blocknumber
    }, (error, events) => {
        for (let i = 0; i < events.length; i++) {
            queue.push({ event: events[i], publicKey, legalerNodeUrl });
        }
    });

    electionContract.getPastEvents('NewValidatorsSet', {
        fromBlock: +blocknumber
    }).then((events) => {// add to storage
        for (let i = 0; i < events.length; i++) {
            queue.push({ event: events[i], publicKey, legalerNodeUrl });
        }
    });

    electionContract.events.GenesisValidatorSet({
        fromBlock: +blocknumber
    }).on('data', (event) => {// add to storage
        queue.push({event, publicKey, legalerNodeUrl});
    });

    electionContract.events.NewValidatorsSet({
        fromBlock: +blocknumber
    }).on('data', (event) => {// add to storage
        queue.push({event, publicKey, legalerNodeUrl});
    });

    // cosmos network nonce and transaction signing??
    // is it necessary to have queue for cosmos
}

async function cosmosTxHandler (event, publicKey, legalerNodeUrl) {
    try {
        let currentBlockNumber = await web3.eth.getBlockNumber();

        logger.info(`Handling ethereum event: ${event.event} with transaction hash: ${event.transactionHash}`);

        while (currentBlockNumber - event.blockNumber < 20) {
            await sleep(5000);
            currentBlockNumber = await web3.eth.getBlockNumber();
            console.log(currentBlockNumber, event.blockNumber);
        }

        if (await transactions.checkIfExists(event)) {
            cosmos.sendToLegalerBC(publicKey, event, legalerNodeUrl);
        }
    } catch (err) {
        logger.error(err.stack);
    }
}