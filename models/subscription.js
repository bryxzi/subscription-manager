const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

// Define the Subscription model with its attributes and data types
const Subscription = sequelize.define('Subscription', {
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
});

// Define the association between the Subscription and User models
Subscription.belongsTo(User);
User.hasMany(Subscription);

// Export the Subscription model
module.exports = Subscription;



const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

class Subscription extends Model {}

Subscription.init(
  {
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
    modelName: 'subscription'
  }
);

Subscription.belongsTo(User);
User.hasMany(Subscription);

module.exports = Subscription;
