const User = require('./User');
const Subscription = require('./Subscription');

// User can have my subscriptions and each subscription belongs to exactly one user

User.hasMany(Subscription, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE' // If user record is deleted then all associated 'subscriptions' will be deleted as well
});
Subscription.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Subscription };
