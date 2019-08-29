const express = require('express');
const app = express();
const getConfig = require('./lib/getConfig');
const bodyParser = require('body-parser');
const rpc = require('./RPC');
const config = getConfig('config');

function server() {
  return new Promise((resolve, reject) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: false
    }));
  
    app.post('/rpc', async (req, res) => {
      const action = await rpc.call({}, req.body);
      res.send(action);
    });
    
    app.listen(config.port, config.bind, () => {
      console.info('Сервер запушен localhost:' + config.port);
      return resolve();
    }).on('error', ()=> {return reject});
  })
}

module.exports = server;
