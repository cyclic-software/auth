const assert = require('assert');
const Provider = require('oidc-provider');

// process.env.SECURE_KEY contains two secret strigs seperated by comma => current_key_str,old_key_str
assert(process.env.cyclic_app_env_SECURE_KEY, 'process.env.SECURE_KEY missing, make sure your env is configured correctly');
assert(process.env.cyclic_app_env_SECURE_KEY.split(',').length === 2, 'process.env.SECURE_KEY format invalid');

// new Provider instance with no extra configuration, will run in default, just needs the issuer
// identifier, uses data from runtime-dyno-metadata heroku here
const oidc = new Provider(`https://api.cyclic.sh`, { // Probably want to overwrite with dynamic URL?
  clients: [
    {
      client_id: 'foo',
      redirect_uris: ['https://jwt.io'], // using jwt.io as redirect_uri to show the ID Token contents
      response_types: ['id_token'],
      grant_types: ['implicit'],
      token_endpoint_auth_method: 'none',
    },
  ],
  cookies: {
    keys: process.env.cyclic_app_env_SECURE_KEY.split(','),
  },
});

oidc.proxy = true;

module.exports = oidc
