const fs = require('fs')
const jwt = require('jsonwebtoken')

// sign with RSA SHA256
var privateKey = fs.readFileSync('keys/jwtRS256-20210702-060749.key');

var token = jwt.sign({ user: 'bar' }, privateKey, { algorithm: 'RS256' });

console.log(token)
