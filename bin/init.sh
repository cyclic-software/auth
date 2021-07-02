#!/usr/bin/env bash

cd "../$(dirname $0)"
date_str=$(date +%Y%m%d-%H%m%S)

echo 'About to create key pair. Just hit enter for both passphrases'
ssh-keygen -t rsa -b 4096 -m PEM -f "keys/jwtRS256-${date_str}.key"
# Don't add passphrase
openssl rsa -in jwtRS256.key -pubout -outform PEM -out "keys/jwtRS256-${date_str}.key.pub"
cat "keys/jwtRS256-${date_str}.key"
cat "keys/jwtRS256-${date_str}.key.pub"
