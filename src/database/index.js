const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const User = require('../model/user');


const connection = new Sequelize(dbConfig);


User.init(connection);




module.exports = connection;