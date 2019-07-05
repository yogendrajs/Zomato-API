const zomato = require('./src/index');

const createClient = config => {
  return new zomato(config);
};

module.exports = createClient;
