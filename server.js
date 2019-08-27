const express = require('express');
const app = express();
const getConfig = require('./lib/getConfig');
const bodyParser = require('body-parser');
const rpc = require('./RPC');

function server() {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));

  app.post('/rpc', async (req, res) => {
    const action = await rpc.call({}, req.body);
    res.send(action);
  });

  app.listen(getConfig().port, getConfig().bind, () => {
    console.info('Сервер запушен localhost:' + getConfig().port);
  });

  process.on('uncaughtException', error => {
    if (error.code === 'EADDRINUSE') {
      console.info('Порт занят, попробуйте в другой раз.');
      setTimeout(() => {
        process.exit(1);
      }, 1000);
    }
  })
}

module.exports = server;
