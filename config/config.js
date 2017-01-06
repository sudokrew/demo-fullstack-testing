const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
  storage: path.resolve(__dirname, '..', 'data', `${NODE_ENV}.sqlite`),
  dialect: 'sqlite',
};

module.exports = config;
