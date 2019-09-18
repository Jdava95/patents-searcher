const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const rpc = require('./RPC');
const getConfig = require('./lib/getConfig');
const config = getConfig('config');
const checkName = require('./lib/checkName');

function server() {
  return new Promise((resolve, reject) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: false
    }));
  
    app.post('/rpc', async (req, res) => {
      const check = checkName(req.body.arguments.name);
      if(!check)res.status(421).send('Не правильно введен параметр');
      const action = await rpc.call({}, req.body);
      res.send(action);
    });

    app.listen(config.port, config.bind, () => {
      console.info('Server was started');
      return resolve();
    }).on('error', reject);
  })
}

module.exports = server;
