const path = require('path');

const NODE_ENV = process.env.NODE_ENV;

const logging = NODE_ENV != 'test' ? console.log : false;

const config = {
  storage: path.resolve(__dirname, '..', '..', 'data', `${NODE_ENV}.sqlite`),
  dialect: 'sqlite',
  logging,
};

module.exports = config;
