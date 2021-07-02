const fs = require('fs')
const jwt = require('jsonwebtoken')

function generate() {
  // sign with RSA SHA256
  var privateKeyPem = fs.readFileSync('keys/jwtRS256-20210702-060749.key');

  var token = jwt.sign({ user: 'bar' }, privateKeyPem, { algorithm: 'RS256' });

  console.log(token)
  return token
}

module.exports.generate = generate
