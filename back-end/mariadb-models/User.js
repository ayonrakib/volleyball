// import { Sequelize, Model, DataTypes } from 'sequelize';
const { DataTypes, BIGINT } = require('sequelize');
const sequelize = require("../mariadb")

const User = sequelize.define('users', {
  id:{
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNul: false
  },
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  session: DataTypes.STRING,
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
  
})();

module.exports = User;