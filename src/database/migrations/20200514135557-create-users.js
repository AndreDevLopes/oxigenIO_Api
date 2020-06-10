"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      name: {
        type: Sequelize.STRING,
        
      },
      email: {
        type: Sequelize.STRING,
        
      },
      password: {
        type: Sequelize.STRING,
      },

      img: {
        type: Sequelize.STRING,
      },
      telefone:{
        type:Sequelize.STRING,
      },
      
     type_user:{
        type:Sequelize.STRING,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    
    return queryInterface.dropTable("users");
  },
};
