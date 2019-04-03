#!/bin/bash
# $1 json file
# $2 account address
legalercli tx sign $1 --from=$2 --chain-id=legaler-chain --home ~Desktop/code/leg/node0 --signature-only << EOF
# supersifra
EOF