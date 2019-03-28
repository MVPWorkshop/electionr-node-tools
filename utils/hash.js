'use strict';

const Web3 = require('web3');
let web3;

const logger = require('./logger');

module.exports = {
    initializeProviders,
    calculateHash,
    calculateLowestHash
};

function initializeProviders(provider) {
    web3 = new Web3(provider);
}

function calculateHash(pubKey, nonce, contractAddr) {
    return web3.utils.soliditySha3(pubKey, nonce, contractAddr)
}

function calculateLowestHash(pubKey, nonce, contractAddr, time) {
    try {
        let minHash = calculateHash(pubKey, nonce, contractAddr);
        let minNonce = nonce;
        let newNonce = nonce;
        const currentTime = Math.floor(+new Date() / 1000);

        while (true) {
            newNonce++;
            let newHash = calculateHash(pubKey, newNonce, contractAddr);
            if (newHash < minHash) {
                minHash = newHash;
                minNonce = newNonce;
            }

            if (Math.floor(+new Date() / 1000) - currentTime >= time * 60) {
                return {
                    nonce: minNonce,
                    hash: minHash,
                    currentNonce: newNonce,
                }
            }
        }
    } catch (err) {
        logger.error(err.stack);
    }
}