'use strict';
module.exports = function(sequelize, DataTypes) {
  var Ad = sequelize.define('Ad', {
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Ad;
};