#!/usr/bin/env node

const program = require('commander');

const {
    validations,
    transactions
} = require('../utils');

program
    .version('0.0.1', '-v, --version')
    .option('-s, --privateKey [value]', 'mandatory - Private key for sending tx to ethereum blockchain')
    .option('-w, --provider [url]', 'mandatory - URL to the ethereum node')
    .option('--chainId [value]', 'mandatory - Chain Identifier of ethereum node')
    .option('-g, --gasPrice [value]', 'mandatory - How fast ethereum transaction will follow though')
    .option('-c, --contract [address]', 'mandatory - election contract address where you want to submit your PoD hash')
    .parse(process.argv);

if (!program.contract || !program.privateKey || !program.provider || !program.gasPrice || !program.chainId) {
    console.log('Something is missing!');
    console.log('  Try: $ miner --help');
} else if (!validations.validatePrivateKey(program.privateKey)) {
    console.log('Bad private key!');
    console.log('  Try: $ cycle --help');
} else if (!validations.validateAddr(program.contract)) {
    console.log('Not ethereum address!');
    console.log('  Try: $ cycle --help');
} else if (!validations.validateProvider(program.provider)) {
    console.log('Bad provider url!');
    console.log('  Try: $ cycle --help');
} else if (!validations.validateNumber(program.chainId)) {
    console.log('Chain identifier must be a number!');
    console.log('  Try: $ miner --help');
} else if (!validations.validateNumber(program.gasPrice)) {
    console.log('Gas price must be a number!');
    console.log('  Try: $ miner --help');
} else {
    transactions.initializeProviders(program.provider, program.contract);
    transactions.publish(
        'publishGenesisSigs',
        program.privateKey,
        program.contract,
        program.gasPrice,
        program.chainId
    ).then((tx) => {

    });
}
