const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Subscription = require('./subscription');

// Define a new model for users using Sequelize
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

//Define relationships between users and subscriptions
User.hasMany(Subscription); // one-to-many (user can have many subs)
Subscription.belongsTo(User); // many-to-one (subscription belongs to user)

// Export the User model
module.exports = User;


