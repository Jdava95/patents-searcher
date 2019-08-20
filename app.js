const bootstrap = require('./bootstrap');

bootstrap()
.catch(err => {
  console.error(err);
});