const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const port = 3501;

var key = fs.readFileSync('/Users/cristopherorellana/.localhost-ssl/localhost.key');
var cert = fs.readFileSync('/Users/cristopherorellana/.localhost-ssl/localhost.crt');
var options = {
  key: key,
  cert: cert
};

// parse application/json


app = express()

app.use(bodyParser.json());

const conn = require('./db.js');

const categorias = require('./categorias/categorias.config.js');

categorias.routesConfig(app);

var server = https.createServer(options, app);

server.listen(port, () => {
  console.log("server starting on port : " + port)
});
