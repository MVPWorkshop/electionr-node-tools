#!/bin/bash
# $1 json file
# $2 account address
electionrcli tx sign $1 --from=$2 --chain-id=electionr-chain --home ~Desktop/code/elect/node0 --signature-only << EOF
# supersifra
EOF