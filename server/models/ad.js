'use strict';
module.exports = function(sequelize, DataTypes) {
  var Ad = sequelize.define('Ad', {
      description: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      isVisible: {
        defaultValue: true,
        type: DataTypes.BOOLEAN
      }
    }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Ad;
};
