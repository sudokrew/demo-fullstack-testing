'use strict';

const mockAdData = require('../../data/mock/ads');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Ads', mockAdData, {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Ads', null, {});
  }
};
