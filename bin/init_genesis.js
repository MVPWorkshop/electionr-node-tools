#!/usr/bin/env node

const program = require('commander');

const {
    validations,
    watcher,
} = require('../utils');

program
    .version('0.0.1', '-v, --version')
    .option('-c, --contract [address]', 'mandatory - election contract address')
    .option('-w, --provider [url]', 'mandatory - URL to the endpoint of ethreum node')
    .option('-b, --blocknumber', 'mandatory - Starting block of event listening')
    .parse(process.argv);

if (!program.contract || !program.provider || !program.blocknumber) {
    console.log('Something is missing!');
    console.log('  Try: $ miner --help');
} else if (!validations.validateAddr(program.contract)) {
    console.log('Something is missing!');
    console.log('  Try: $ miner --help');
} else if (!validations.validateProvider(program.provider)) {
    console.log('Something is missing!');
    console.log('  Try: $ miner --help');
} else if (!validations.validateNumber(program.blocknumber)) {
    console.log('Something is missing!');
    console.log('  Try: $ miner --help');
} else {
    init_genesis(program.provider, program.contract, program.blocknumber);
}

async function init_genesis(provider, contract, blocknumber) {
    watcher.initializeWatcher(provider, contract);

    await watcher.checkIfGenesis(blocknumber);
}