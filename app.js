const bootstrap = require('./bootstrap');

bootstrap()
.catch(err => {
  console.error(err);
  process.on('exit', error => {
      process.exit(0);
  })
});
