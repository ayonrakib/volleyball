// import { Sequelize, Model, DataTypes } from 'sequelize';
const { DataTypes } = require('sequelize');
const sequelize = require("../mariadb")

const User = sequelize.define('user', {
  id: DataTypes.BIGINT,
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  session: DataTypes.STRING,
  salt: DataTypes.STRING,
  role: DataTypes.STRING
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false,      
    }
);

(async () => {
  await sequelize.sync();
  // Code here
})();

module.exports = User;