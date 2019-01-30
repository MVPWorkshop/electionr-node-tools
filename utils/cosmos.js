'use strict';

const axios = require('axios');

const logger = require('./logger');

module.exports = {
    sendToLegalerBC
};

function sendToLegalerBC (publicKey, event, legalerNodeUrl) {
    const validators = event.returnValues.validators;
    const cycle = event.returnValues.cycle || 0;

    for (let i = 0;i < validators.length; i++) {
        logger.info(`Sent validator: ${validators[i]} to the LegalerBC in cycle: ${cycle}`);
        const tx = generateNewValidatorTxs(publicKey, cycle);
        // axios.post(legalerNodeUrl, tx); // @TODO: send to tx to cosmos
    }
}

function generateNewValidatorTxs (publicKey, cycle) { // @TODO: implement this function
    let txObject= {};
    return txObject
}