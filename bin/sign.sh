#!/bin/bash
# $1 json file
# $2 account address
ls -al
legalercli tx sign $1 --from=$2 --chain-id=legaler-chain --home /Users/vuksan/.led/node0 --signature-only << EOF
# supersifra
EOF