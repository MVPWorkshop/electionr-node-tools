'use strict';

const abi = require('ethereumjs-abi');
const BigNumber = require('bignumber.js');


const Web3 = require('web3');
const web3 = new Web3();

module.exports = {
    calculateHash,
    calculateLowestHash
};

function calculateHash (pubKey, nonce, contractAddr) {
    const sum = BigNumber(pubKey).plus(BigNumber(nonce)).plus(BigNumber(web3.utils.hexToNumberString(contractAddr)));
    return '0x' + abi.soliditySHA256(
        [ "uint256" ],
        [ sum.toFixed() ]
    ).toString('hex');
}

function calculateLowestHash (pubKey, nonce, contractAddr, time) {
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