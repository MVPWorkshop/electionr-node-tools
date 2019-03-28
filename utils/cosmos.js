'use strict';

const axios = require('axios');
const fs = require('fs');
const url = require('url');
const shell = require('shelljs');

const logger = require('./logger');
const {getBlockTS} = require('./transactions');
const templateGenesis = require('../utils/templates/genesis');
const templateBaseReq = require('../utils/templates/baseReq');
const templateCosmosReq = require('../utils/templates/cosmosTx');

const tempFileLocation = '../temp';

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

    const resp = await axios.post(url.resolve(legalerNodeUrl, '/election/validator_elects/'), baseReq);
    console.log(resp);

    let cosmosTx = templateCosmosReq;
    cosmosTx.tx = resp.value;



    if (!fs.existsSync(tempFileLocation)){
        fs.mkdirSync(tempFileLocation);
    }

    await fs.writeFile(tempFileLocation + '/cosmosTx.json', cosmosTx, (err, data) => {
        if (err) {
            console.log('Something went wrong!');
            console.log(err);
        }
    });

    // sign that tx object with vuk script TODO!
    const data = await shell.exec('ls -al \n supersifra');
    const signature = data.stdout;

    // merge tx object and signature
    cosmosTx.tx.signature = JSON.parse(signature);
    console.log(cosmosTx);
    // send merged tx object to /txs on chain
    const response = axios.post(url.resolve(legalerNodeUrl, '/txs'), cosmosTx);
    console.log(response);
}

function generateNewValidatorTxs(privateKey, cycle) { // @TODO: implement this function
    let txObject = {};
    //sign transaction
    return txObject
}

async function generateBaseReq(conPubKeys, oprAddrs, cycle, from) {
    const baseReq = templateBaseReq;

    baseReq.base_req.from = from;
    baseReq.cycle_number = cycle.toString();

    for (let i = 0; i < conPubKeys.length; i++) {
        const electedValidator = {
            operator_address: oprAddrs[i],
            consensus_pubkey: conPubKeys[i],
            place: i + 1
        };

        baseReq.elected_validators.push(electedValidator);
    }
    return JSON.stringify(baseReq);
}

async function generateGenesis(event) {
    const genesis = templateGenesis;

    genesis.genesis_time = new Date(await getBlockTS(event.blockNumber) * 1000);
    genesis.chain_id = 'legaler-' + event.id;

    const validators = event.returnValues.validators;
    genesis.validators = [];
    for (let i = 0; i < validators.length; i++) {
        genesis.validators[i] = {
            'operator_address': 'cosmosvaloper' + validators[i], // todo: cosmos sdk operator address (currently not in contract)
            'consensus_pubkey': 'cosmosvalconspub' + validators[i], // todo: this is uint256 we need 256 bit ed25519
            'jailed': false,
            'tokens': 1
        }
    }

    console.log('Here it is, your genesis.json file.');
    console.log(JSON.stringify(genesis));
}