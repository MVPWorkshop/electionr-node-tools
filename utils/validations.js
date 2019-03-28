'use strict';

const Web3 = require('web3');
let web3;
const url = require('url');

const hex32bytes = new RegExp(/^(0x)?[A-Fa-f0-9]{64}$/i);

module.exports = {
    validateAddr,
    validateNumber,
    validatePublicKey,
    validateTime,
    validatePrivateKey,
    validateProvider,
    validateHash,
    validateOperatorAddress,
    validateCosmosPrivateKey
};

function validateCosmosPrivateKey(privateKey) { // @TODO: implemenet correct publicKey validation algorithm
    return true;
}

function validatePublicKey(publicKey) { // @TODO: implemenet correct publicKey validation algorithm
    return true;
}

function validateOperatorAddress(oprAddr) { // @TODO: implemenet correct publicKey validation algorithm
    return true;
}

function validateAddr(address) {
    return Web3.utils.isAddress(address);
}

function validateTime(ts) {
    return !isNaN(ts);
}

function validateNumber(nonce) {
    return !isNaN(nonce);
}

function validatePrivateKey(privateKey) {
    return hex32bytes.test(privateKey);
}

function validateProvider(provider) {
    try {
        url.parse(provider);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

function validateHash(hash) {
    return hex32bytes.test(hash);
}