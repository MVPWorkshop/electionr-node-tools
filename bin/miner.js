#!/usr/bin/env node

const program = require('commander');
const bech32 = require('bech32');

const {
    hash,
    transactions,
    validations,
    logger,
} = require('../utils');

program
    .version('0.0.1', '-v, --version')
    .option('-p, --consensusPublicKey [value]', 'mandatory - your ed25519 public key')
    .option('-o, --operatorAddress [value]', 'mandatory - your operator address associated with consensus public key')
    .option('-s, --privateKey [value]', 'mandatory - your ethereum private key  for sending lowest PoD hash to ethereum') // @TODO: dont let it stay in system trace
    .option('-c, --contract [address]', 'mandatory - election contract address where you want to submit your PoD hash')
    .option('-n, --nonce [value]', '{default = 0} - Starting nonce when calculating PoD hash')
    .option('-h, --hash [value]', '{default = 0xfff...} - Send transaction only if hash lower than this value')
    .option('-t, --time [value]', 'mandatory - minimum time in minutes for single transaction to be fired') // todo: better explanation
    .option('-w, --provider [url]', 'mandatory - URL to the ethereum node')
    .option('--chainId [value]', 'mandatory - Chain Identifier of ethereum node')
    .option('-g, --gasPrice [value]', 'mandatory - How fast ethereum transaction will follow though')
    .parse(process.argv);

if (!program.consensusPublicKey || !program.contract || !program.time || !program.privateKey || !program.provider || !program.gasPrice || !program.operatorAddress || !program.chainId) {
    console.log('Something is missing!');
    console.log('  Try: $ miner --help');
} else if (!validations.validatePublicKey(program.consensusPublicKey)) {
    console.log('Bad public key!');
    console.log('  Try: $ miner --help');
} else if (!validations.validateOperatorAddress(program.operatorAddress)) {
    console.log('Bad operator address!');
    console.log('  Try: $ miner --help');
} else if (!validations.validatePrivateKey(program.privateKey)) {
    console.log('Bad private key!');
    console.log('  Try: $ miner --help');
} else if (!validations.validateAddr(program.contract)) {
    console.log('Not ethereum account!');
    console.log('  Try: $ miner --help');
} else if (!validations.validateTime(program.time)) {
    console.log('Not a number!');
    console.log('  Try: $ miner --help');
} else if (program.nonce && !validations.validateNumber(program.nonce)) {
    console.log('Nonce must be a number!');
    console.log('  Try: $ miner --help');
} else if (!validations.validateProvider(program.provider)) {
    console.log('Bad provider url!');
    console.log('  Try: $ miner --help');
} else if (program.chainId && !validations.validateNumber(program.chainId)) {
    console.log('Chain identifier must be a number !');
    console.log('  Try: $ miner --help');
} else if (program.hash && !validations.validateHash(program.hash)) {
    console.log('Bad hash!');
    console.log('  Try: $ miner --help');
} else {
    program.operatorAddress = '0x' + Buffer.from(bech32.fromWords(bech32.decode(program.operatorAddress).words)).toString('hex');
    program.consensusPublicKey = '0x' + Buffer.from(bech32.fromWords(bech32.decode(program.consensusPublicKey).words)).toString('hex').substr(10);
    hash.initializeProviders(program.provider);
    transactions.initializeProviders(program.provider, program.contract);
    startMining(program.privateKey, program.consensusPublicKey, program.operatorAddress, program.nonce, program.contract, program.time, program.gasPrice, program.hash, program.chainId);
}

async function startMining(privateKey, conPublicKey, oprAddr, nonce = 0, contract, time, gasPrice, minPoDHash = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', chainId) {
    logger.info('Starting miner...');
    let minHash = minPoDHash || hash.calculateHash(conPublicKey, nonce, contract);
    let minNonce = nonce;

    while (true) {
        const data = hash.calculateLowestHash(conPublicKey, minNonce, contract, time);

        if (data.hash < minHash) {
            minHash = data.hash;
            minNonce = data.nonce;

            const tx = await transactions.electMe(privateKey, contract, conPublicKey, oprAddr, data.nonce, data.hash, gasPrice, chainId);

            if (tx) {
                logger.info(`Successfully mined and sent transaction to the Election contract - PoD hash: ${data.hash} PoD nonce: ${data.nonce} - Ethereum transaction hash: ${tx.transactionHash}`);
            }
        } else {
            logger.info(`Successfully mined new PoD hash: ${data.hash} with nonce ${data.nonce} but it is not smaller then ${minHash}`);
            minNonce = data.currentNonce + 1;
        }
    }
}

