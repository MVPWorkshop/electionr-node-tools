'use strict';

const Web3 = require('web3');
const url = require('url');

const privateKeyReqExp = new RegExp(/^[a-f0-9]{64}$/i);

module.exports = {
    validateAddr,
    validateNonce,
    validatePublicKey,
    validateTime,
    validatePrivateKey,
    validateProvider
};

function validatePublicKey (publicKey) { // @TODO: implemenet correct publicKey validation algorithm
    return true;
}

function validateAddr (address) {
    return Web3.utils.isAddress(address);
}

function validateTime (ts) {
    return !isNaN(ts);
}

function validateNonce (nonce) {
    return !isNaN(nonce);
}

function validatePrivateKey (privateKey) {
    return privateKeyReqExp.test(privateKey);
}

function validateProvider (provider) {
    try {
        const myURl = url.parse(provider);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}