'use strict';

const axios = require('axios');
const fs = require('fs');
const url = require('url');
const shell = require('shelljs');
const bech32 = require('bech32');
const BigNumber = require('big-number');
const web3 = require('web3');

const logger = require('./logger');
const {getBlockTS} = require('./transactions');
const templateGenesis = require('../utils/templates/genesis');
const templateBaseReq = require('../utils/templates/baseReq');
const templateCosmosReq = require('../utils/templates/cosmosTx');

const tempFileLocation = '../temp';
const tendermintConsPubPrefix = '1624de64'; // ed25519
const tendermintConsPubLength = '20';

module.exports = {
    sendToLegalerBC,
    generateGenesis,
};

async function sendToLegalerBC(privateKey, event, legalerNodeUrl, from) {
    const conPubKeys = event.returnValues.conPubKey;
    const oprAddrs = event.returnValues.oprAddr;
    const cycle = event.returnValues.cycle || 0;

    const baseReq = await generateBaseReq(conPubKeys, oprAddrs, cycle, from);
    // send to REST to gen tx object

    const resp = await axios.post(url.resolve(legalerNodeUrl, '/election/validator_elects'), baseReq);

    let stdTx = templateCosmosReq;
    stdTx.tx = resp.data.value;

    if (!fs.existsSync(tempFileLocation)) {
        fs.mkdirSync(tempFileLocation);
    }

    await fs.writeFile(tempFileLocation + '/cosmosTx.json', JSON.stringify(resp.data), (err) => {
        if (err) {
            console.log('Something went wrong!');
            console.log(err);
        }
    });
    console.log('MSG without signature:');
    console.log(JSON.stringify(stdTx));

    // TODO: implement signatures & automatic broadcasting tx
}

async function generateBaseReq(conPubKeys, oprAddrs, cycle, from) {
    const baseReq = templateBaseReq;

    baseReq.base_req.from = from;
    baseReq.cycle_number = cycle.toString();

    for (let i = 0; i < conPubKeys.length; i++) {
        let operatorAddressWords = bech32.toWords(Buffer.from(web3.utils.toHex(oprAddrs[i]).substr(2), 'hex'));
        let conPubKeyWords = bech32.toWords(Buffer.from((tendermintConsPubPrefix + tendermintConsPubLength + web3.utils.toHex(conPubKeys[i]).substr(2)), 'hex'));
        const electedValidator = {
            operator_addr: bech32.encode('cosmosvaloper', operatorAddressWords),
            cons_pub_key: bech32.encode('cosmosvalconspub', conPubKeyWords),
            place: (i + 1).toString()
        };

        baseReq.elected_validators.push(electedValidator);
    }
    return JSON.stringify(baseReq);
}

async function generateGenesis(event) {
    const genesis = templateGenesis;

    genesis.genesis_time = new Date(await getBlockTS(event.blockNumber) * 1000);
    genesis.chain_id = 'legaler-chain';

    const validators = event.returnValues.validators;
    genesis.validators = [];
    for (let i = 0; i < validators.length; i++) {
        let operatorAddressWords = bech32.toWords(Buffer.from(web3.utils.toHex(oprAddrs[i]).substr(2), 'hex'));
        let conPubKeyWords = bech32.toWords(Buffer.from((tendermintConsPubPrefix + tendermintConsPubLength + web3.utils.toHex(conPubKeys[i]).substr(2)), 'hex'));
        genesis.validators[i] = {
            'operator_addr': bech32.encode('cosmosvaloper', operatorAddressWords),
            'cons_pub_key': bech32.encode('cosmosvalconspub', conPubKeyWords),
            'jailed': false,
            'tokens': 1
        }
    }

    console.log('Here it is, your genesis.json file.');
    console.log(JSON.stringify(genesis));
}