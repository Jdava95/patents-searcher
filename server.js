const express = require('express');
const app = express();
const methods = require('./storage/methods');
const getConfig = require('./lib/getConfig');
const fileHandler = require('./lib/fileHandler');
const Patent = require('./storage/Patent');
const path = require('path');
const urlHandler = require('./urlHandler');
const checkUpdate = require('./scripts/checkUpdate');
const PATH_TO_CSV = path.join(__dirname, './data-20190701-structure-20171019.csv');

function server() {

  app.get('/getStream', async function (req, res, next) {
    try {
      await fileHandler( Patent ,{ name: 'Patent', path: PATH_TO_CSV });
      res.send('qw');
    } catch (err) {
      next(err);
    }
  })

  app.get('/patent/:id' , async (req, res) => {
    const id = req.params.id;
    const patentInfo = await methods.findById(id);
    res.json(patentInfo);
  })

  app.get('/checkUpdate', async (req, res) => {
    await checkUpdate();
    res.end();
  })

  app.listen(getConfig().port, getConfig().bind, () => {
    console.info('server was started: ' + getConfig().port);
  });

  process.on('uncaughtException', error => {
    if (error.code === 'EADDRINUSE') {
      console.log('Your port is busy, try using another ...');
      setTimeout(() => {
        process.exit(0);
      }, 1000);
    }
  })
}

module.exports = server;
