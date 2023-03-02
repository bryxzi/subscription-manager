const User = require('./user');
const Subscription = require('./subscription');

User.hasMany(Subscription, { onDelete: 'CASCADE' });
Subscription.belongsTo(User);

module.exports = { User, Subscription };
