'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('newbornfoodlogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      diaperchange: {
        type: Sequelize.STRING
      },
      sleep: {
        type: Sequelize.TIME
      },
      bottle: {
        type: Sequelize.INTEGER
      },
      breastfed: {
        type: Sequelize.TIME
      },
      notes: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('newbornfoodlogs');
  }
};