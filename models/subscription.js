const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./user');

class Subscription extends Model { }

Subscription.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('monthly', 'yearly', 'one-time'),
      allowNull: false
    },
    // Associate a Subscription instance with a User instance
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'subscription',
  }
);

module.exports = Subscription;
