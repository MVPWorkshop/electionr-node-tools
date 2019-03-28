'use strict';

const Queue = require('better-queue');
const Web3 = require('web3');
const abi = require('./abi.js');// @TODO: seperate file

const cosmos = require('./cosmos');
const logger = require('./logger');
const transactions = require('./transactions');

const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

let web3;
let electionContract;

const queue = new Queue(async (args, cb) => {
    const {event, privateKey, legalerNodeUrl, from} = args;
    await cosmosTxHandler(event, privateKey, legalerNodeUrl, from);
    cb();
}, {
    concurrent: 1
});

module.exports = {
    initializeWatcher,
    start,
    checkIfGenesis,
};

function initializeWatcher(provider, contract) {
    web3 = new Web3(new Web3.providers.WebsocketProvider(provider));
    electionContract = new web3.eth.Contract(abi, contract);

    transactions.initializeProviders(provider, contract);
}

async function start(from, privateKey, legalerNodeUrl, blocknumber, contract, provider) {
    web3 = new Web3(provider);
    electionContract = new web3.eth.Contract(abi, contract);

    transactions.initializeProviders(provider, contract);

    logger.info(`Started watching transaction from ethereum node from block: ${blocknumber}`);

    electionContract.getPastEvents('GenesisValidatorSet', {
        fromBlock: +blocknumber
    }, (error, events) => {
        for (let i = 0; i < events.length; i++) {
            queue.push({event: events[i], privateKey, legalerNodeUrl, from});
        }
    });

    electionContract.getPastEvents('NewValidatorsSet', {
        fromBlock: +blocknumber
    }).then((events) => {
        for (let i = 0; i < events.length; i++) {
            queue.push({event: events[i], privateKey, legalerNodeUrl});
        }
    });

    electionContract.events.GenesisValidatorSet({
        fromBlock: +blocknumber
    }).on('data', (event) => {
        queue.push({event, privateKey, legalerNodeUrl});
    });

    electionContract.events.NewValidatorsSet({
        fromBlock: +blocknumber
    }).on('data', (event) => {
        queue.push({event, privateKey, legalerNodeUrl});
    });
}

async function checkIfGenesis(blocknumber) {
    return new Promise(async (resolve, reject) => {
        const currentBlockNumber = await web3.eth.getBlockNumber();

        electionContract.getPastEvents('GenesisValidatorSet', {
            fromBlock: +blocknumber,
            toBlock: currentBlockNumber - 20
        }, async (error, events) => {
            if (error) {
                reject(error);
            } else {
                web3.currentProvider.connection.close();
                await cosmos.generateGenesis(events[0]);
                resolve();
            }
        });
    });
}

async function cosmosTxHandler(event, privateKey, legalerNodeUrl, from) {
    try {
        let currentBlockNumber = await web3.eth.getBlockNumber();

        logger.info(`Handling ethereum event: ${event.event} with transaction hash: ${event.transactionHash}`);

        while (currentBlockNumber - event.blockNumber < 20) {
            await sleep(5000);
            currentBlockNumber = await web3.eth.getBlockNumber();
        }

        if (await transactions.checkIfExists(event)) {
            await cosmos.sendToLegalerBC(privateKey, event, legalerNodeUrl, from);
        }
    } catch (err) {
        logger.error(err.stack);
    }
}