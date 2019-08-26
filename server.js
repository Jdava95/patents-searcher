const express = require('express');
const app = express();
const getConfig = require('./lib/getConfig');
const Patent = require('./storage/Patent');
var bodyParser = require('body-parser')

function server() {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }));

  app.post('/holder', async (req, res) => {
    const query = req.body.name;
    const response = await Patent.findByNameHolders(query);
    res.send(response);
  })

   app.post('/program', async (req, res) => {
     const query = req.body.name;
     const response = await Patent.findByNameProgram(query);
     res.send(response)
   })

  app.listen(getConfig().port, getConfig().bind, () => {
    console.info('server was started: ' + getConfig().port);
  });

  process.on('uncaughtException', error => {
    if (error.code === 'EADDRINUSE') {
      console.info('Your port is busy, try using another ...');
      setTimeout(() => {
        process.exit(0);
      }, 1000);
    }
  })
}

module.exports = server;
