# Legaler-node-tools

## Abstract

This project is made to be used with `legaler-bc` project in process of PoD as a process of bootstrapping Legaler Blockchain. It provides all necessary tools to start and maintain blockchain as a validator.

## `bin/miner.js`

This script is used to "mine" PoD hash, you can find usage with `--help` flag.

Example:
`node miner.js --consensusPublicKey cosmosvalconspub1zcjduepq7sjfglw7ra4mjxpw4ph7dtdhdheh7nz8dfgl6t8u2n5szuuql9mqsrwquu -o cosmosvaloper1depk54cuajgkzea6zpgkq36tnjwdzv4avv9cxd -s 0x663f2d20768726f198eb8e70d62588
 3bbcbbcdd0aa67661c15440e36523653d7 -c 0x404C7ef6e1cD23006FCDf6bfb900adD9F661C672 -t 0.1 -w ws://localhost:7545 --chainId 5777 -g 0
`    

## `bin/publish_genesis.js`

Run this script to publish initial genesis validator set. For usage use `--help` flag.

Example:
`node publish_genesis.js -s 0xe88003c6d9aa22267d0e109d7226676e7fb013bcb23f67e54dd705e92a67c8a0 -w ws://localhost:7545 --chainId 5777 -g 0 -c 0x404C7ef6e1cD23006FCDf6bfb900adD9F661C672`

## `bin/cycle.js`

This script is watching for `PublishGenesisSigs` & `PublishSigs` event from ethereum node and it is generating stdTx. Signature generation and forwarding towards Legaler Blockchain is to be implemented.
You can find usage with `--help` flag.

Example:
`node ./cycle.js -f cosmos1ge5t2s0k78y4zws2gpv5wsa0dw83fmflcpw0qn -p 123456 -c 0x404C7ef6e1cD23006FCDf6bfb900adD9F661C672 -w http://localhost:7545 -l http://localhost:1317 -b 0`


## `bin/init_genesis.js`

This script partly implemented but you could find template of `genesis.json` in `utils/templates/genesis.json`.