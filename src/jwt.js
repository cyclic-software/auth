const fs = require('fs')
// const jwt = require('jsonwebtoken')

// function generate() {
//   // sign with RSA SHA256
//   var privateKeyPem = fs.readFileSync('keys/jwtRS256-20210702-060749.key');

//   var token = jwt.sign({ user: 'bar' }, privateKeyPem, { algorithm: 'RS256' });

//   console.log(token)
//   return token
// }

const crypto = require('crypto')

const { SignJWT } = require('jose/jwt/sign')

async function create() {

  var privateKeyPem = fs.readFileSync('keys/jwtRS256-20210702-060749.key');

  const privateKey = crypto.createPrivateKey(privateKeyPem)
  const jwt = await new SignJWT({ 'api:read': true })
    .setProtectedHeader({ alg: 'RS256' })
    .setIssuedAt()
    .setIssuer('auth.cyclic.sh')
    .setAudience('*.cyclic.sh')
    .setExpirationTime('24h')
    .sign(privateKey)

  console.log(jwt)
  return jwt
}

module.exports.create = create
// module.exports.generate = generate
