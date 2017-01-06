'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Ads',
      'isVisible',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropColumn(
      'Ads',
      'isVisible'
    );
  }
};
