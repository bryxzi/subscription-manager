const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

class Subscription extends Model {}

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
    }
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'subscription',
  }
);

Subscription.belongsTo(User);
User.hasMany(Subscription);

module.exports = Subscription;
