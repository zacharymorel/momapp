'use strict';
module.exports = function(sequelize, DataTypes) {
  var contractionTimerTable = sequelize.define('contractionTimerTable', {
    clocktimerstampstart: DataTypes.TIME,
    clocktimerstampstop: DataTypes.TIME
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return contractionTimerTable;
};