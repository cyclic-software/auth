require('dotenv').config()

const fs = require('fs')
const crypto = require('crypto')
const { SignJWT } = require('jose/jwt/sign')
const { fromKeyLike } = require('jose/jwk/from_key_like')

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


async function wellKnown() {

  console.log(process.env.PUBLIC_KEY_FILENAME_1)
  var publicKeyPem = fs.readFileSync('keys/jwtRS256-20210702-060749.key.pub');
  const publicJwk = await fromKeyLike(publicKeyPem)

  console.log(publicJwk)

  return publicJwk
}

module.exports.wellKnown = wellKnown
