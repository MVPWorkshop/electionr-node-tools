'use strict';

const abi = [
        {
            "constant": true,
            "inputs": [],
            "name": "bondPeriod",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function",
            "signature": "0x0881123c"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "blockReward",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function",
            "signature": "0x0ac168a1"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "validatorElect",
            "outputs": [
                {
                    "name": "_sender",
                    "type": "address"
                },
                {
                    "name": "_oprAddr",
                    "type": "uint256"
                },
                {
                    "name": "_hash",
                    "type": "bytes32"
                },
                {
                    "name": "_validator",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function",
            "signature": "0x13912d33"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "finishValidators",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function",
            "signature": "0x432ff693"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "periodBlock",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function",
            "signature": "0x4834c649"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "cycleValidators",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function",
            "signature": "0x7bc8dc88"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "list",
            "outputs": [
                {
                    "name": "_next",
                    "type": "uint256"
                },
                {
                    "name": "_prev",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function",
            "signature": "0x80c9419e"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "head",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function",
            "signature": "0x8f7dcfa3"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "currValidators",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function",
            "signature": "0xb1e5a4dd"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "nextElectionBlockEnd",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function",
            "signature": "0xf0874e9d"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "startValidators",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function",
            "signature": "0xf234c1bd"
        },
        {
            "inputs": [
                {
                    "name": "_startValidators",
                    "type": "uint256"
                },
                {
                    "name": "_cycleValidators",
                    "type": "uint256"
                },
                {
                    "name": "_finishValidators",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor",
            "signature": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "conPubKey",
                    "type": "uint256[]"
                },
                {
                    "indexed": false,
                    "name": "oprAddr",
                    "type": "uint256[]"
                }
            ],
            "name": "GenesisValidatorSet",
            "type": "event",
            "signature": "0xbbc132d613844638f8325b5f85d5f651d9e69acef156c7aff7354bd73f10f1a2"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "cycle",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "conPubKey",
                    "type": "uint256[]"
                },
                {
                    "indexed": false,
                    "name": "oprAddr",
                    "type": "uint256[]"
                }
            ],
            "name": "NewValidatorsSet",
            "type": "event",
            "signature": "0x41896df841146c20ba10d73fa75aab17e49805a26b540921f15b325feb953d53"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_conPubKey",
                    "type": "uint256"
                },
                {
                    "name": "_oprAddr",
                    "type": "uint256"
                },
                {
                    "name": "_nonce",
                    "type": "uint256"
                },
                {
                    "name": "_hash",
                    "type": "bytes32"
                }
            ],
            "name": "electMe",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function",
            "signature": "0x6902c495"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "publishGenesisSigs",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function",
            "signature": "0xa3fc0df2"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "publishSigs",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function",
            "signature": "0x71e7708a"
        }
    ];

module.exports = abi;