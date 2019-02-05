#!/usr/bin/env node

const program = require('commander');

const {
    validations,
    watcher
} = require('../utils');

program
    .version('0.0.1', '-v, --version')
    .option('-p, --publicKey [value]', 'mandatory - your ed25519 public key')
    .option('-c, --contract [address]', 'mandatory - election contract address')
    .option('-w, --provider [url]', 'mandatory - Url to the ethereum node')
    .option('-l, --legalerNode [url]', 'mandatory - Url to the Legaler node')
    .option('-b, --blocknumber', 'mandatory - Starting block of event listening')
    .parse(process.argv);

if (!program.publicKey || !program.contract || !program.provider) {
    console.log('Something is mising!');
    console.log('  Try: $ cycle --help');
} else if (!validations.validatePublicKey(program.publicKey)) {
    console.log('Bad public key!');
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
    watcher.start(program.publicKey, program.legalerNode, program.blocknumber, program.contract, program.provider);
}