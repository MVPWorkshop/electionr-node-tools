#!/usr/bin/env node

const program = require('commander');

const {
    validations,
    watcher,
    hash
} = require('../utils');

program
    .version('0.0.1', '-v, --version')
    .option('-f, --from [value]', 'mandatory - your account key e.g. "cosmos..."')
    .option('-p, --privateKey [value]', 'mandatory - your ed25519 validator private key on legalerBC')
    .option('-c, --contract [address]', 'mandatory - election contract address')
    .option('-w, --provider [url]', 'mandatory - WebSocketUrl to the local ethereum node')
    .option('-l, --legalerNode [url]', 'mandatory - Url to the Legaler node')
    .option('-b, --blocknumber [value]', 'mandatory - Starting block of event listening')
    .parse(process.argv);

if (!program.privateKey || !program.contract || !program.provider || !program.from) {
    console.log('Something is mising!');
    console.log('  Try: $ cycle --help');
} else if (!validations.validateCosmosPrivateKey(program.privateKey)) {
    console.log('Bad private key!');
    console.log('  Try: $ cycle --help');
} else if (!validations.validateAddr(program.contract)) {
    console.log('Not ethereum account!');
    console.log('  Try: $ cycle --help');
} else if (!validations.validateProvider(program.provider)) {
    console.log('Bad provider url!');
    console.log('  Try: $ cycle --help');
} else if (!validations.validateProvider(program.legalerNode)) {
    console.log('Bad provider url!');
    console.log('  Try: $ cycle --help');
} else if (!validations.validateNumber(program.blocknumber)) {
    console.log('Bad provider url!');
    console.log('  Try: $ cycle --help');
} else {
    watcher.initializeWatcher(program.provider, program.contract);
    hash.initializeProviders(program.provider);
    watcher.start(program.from, program.privateKey, program.legalerNode, program.blocknumber, program.contract, program.provider);
}