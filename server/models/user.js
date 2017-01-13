'use strict';

const sanitization = require('../sanitization').default;

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: true
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    hooks: {
      beforeValidate: function(user, options) {
      }
    },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  User.hook('beforeValidate', function usernameToLowerCase(user, options) {
    if (user.dataValues.hasOwnProperty('username')) {
      user.dataValues.username = sanitization.sanitizeToLowerCase(user.dataValues.username);
    }
  });

  return User;
};
