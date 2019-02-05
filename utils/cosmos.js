'use strict';

const axios = require('axios');

const logger = require('./logger');
const { getBlockTS } = require('./transactions');

module.exports = {
    sendToLegalerBC,
    generateGenesis,
};

function sendToLegalerBC(publicKey, event, legalerNodeUrl) {
    const validators = event.returnValues.validators;
    const cycle = event.returnValues.cycle || 0;

    for (let i = 0; i < validators.length; i++) {
        logger.info(`Sent validator: ${validators[i]} to the LegalerBC in cycle: ${cycle}`);
        const tx = generateNewValidatorTxs(publicKey, cycle);
        // axios.post(legalerNodeUrl, tx); // @TODO: send to tx to cosmos
    }
}

function generateNewValidatorTxs(publicKey, cycle) { // @TODO: implement this function
    let txObject = {};
    return txObject
}

async function generateGenesis(event) {
    const genesis = {};

    genesis.genesis_time = new Date(await getBlockTS(event.blockNumber) * 1000);
    genesis.chain_id = 'legaler-' + event.id;

    const validators = event.returnValues.validators;
    genesis.validators = [];
    for (let i = 0; i < validators.length; i++) {
        genesis.validators[i] = {
            'pub_key': [
                1,
                validators[i]
            ],
            'amount': 1
        }
    }
    genesis.app_hash = 'something'; // todo: hash something

    console.log('Here it is, your genesis.json file.');
    console.log(JSON.stringify(genesis));
}