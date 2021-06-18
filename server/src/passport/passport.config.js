const passport = require('passport');
require('./local.strategy')();

module.exports = function passportConfig(server) {
  server.use(passport.initialize());
};
