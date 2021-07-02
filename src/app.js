const express = require('express')
const app = express()
const jwt = require('./jwt')

var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html','css','js','ico','jpg','jpeg','png','svg'],
  index: ['index.html'],
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}

app.use(express.static('../public', options))

app.get('/create', async (req,res) => {

  var jwtStr = await jwt.create()

  res.set('content-type', 'application/json')
    .send(JSON.stringify({
    jwt: jwtStr
  },null,2))
  .end()
})

module.exports = app
