'use strict';

const Web3 = require('web3');
const abi = require('./abi.js');

const logger = require('./logger');

let web3;
let electionContract;

module.exports = {
    electMe,
    publish,
    initializeProviders,
    checkIfExists,
    getBlockTS
};

function initializeProviders(provider, contract) {
    web3 = new Web3(provider);
    electionContract = new web3.eth.Contract(abi, contract);
}

async function electMe(privateKey, contract, conPublicKey, oprAddr, nonce, podHash, gasPrice, chainId) {
    if (web3) {
        try {
            const data = electionContract.methods.electMe(conPublicKey, oprAddr, nonce, podHash).encodeABI();

            return sendRawTx(privateKey, contract, chainId, gasPrice, data)
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

async function checkIfExists(event) {
    const tx = await web3.eth.getTransactionReceipt(event.transactionHash);
    if (!tx) {
        return false;
    }

    return tx.blockNumber === event.blockNumber;
}

async function getBlockTS(blocknumber) {
    const block = await web3.eth.getBlock(blocknumber);
    return block.timestamp;
}

async function sendRawTx (privateKey, contract, chainId, gasPrice, data) {
    const account = await web3.eth.accounts.privateKeyToAccount(privateKey);
    const nonce = await web3.eth.getTransactionCount(account.address);

    const signedTx = await account.signTransaction({
        from: account.address,
        to: contract,
        chainId: chainId,
        nonce: nonce,
        data: data,
        gasPrice: gasPrice,
        gasLimit: 8000000
    });

    return web3.eth.sendSignedTransaction(signedTx.rawTransaction);
}

async function publish(methodName, privateKey, contract, gasPrice, chainId) {
    const data = electionContract.methods[methodName]().encodeABI();

    return sendRawTx(privateKey, contract, chainId, gasPrice, data)
}