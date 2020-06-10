const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        img: DataTypes.STRING,
        type_user: DataTypes.STRING,
       
      },
      {
        sequelize,
      }
    );
  }
  
}

module.exports = User;
