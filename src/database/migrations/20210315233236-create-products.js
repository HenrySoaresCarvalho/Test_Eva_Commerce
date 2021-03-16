'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', { 
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false
      },
      name:{
        type: Sequelize.STRING,
        allowNull: false
      },
      description:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      price:{
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      image1:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      image2:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      image3:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      creator_id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model: 'users',
          key: 'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull:false
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull:false
      }
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');

  }
};
