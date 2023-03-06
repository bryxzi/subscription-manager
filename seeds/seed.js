const sequelize = require('../config/connection');
const { User, Subscription } = require('../models');
const userData = require('./userdata.json');
const subscriptionData = require('./subscriptiondata.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const subscription of subscriptionData) {
    const { UserId, ...subscriptionData } = subscription;
    const user = users.find((user) => user.username === UserId);
    await Subscription.create({
      ...subscriptionData,
      UserId: user.id,
    });
  }

  process.exit(0);
};

seedDatabase();
