const express = require('express');
const router = express.Router();

const subscriptionRoutes = require('./subscriptionRoutes');
const userRoutes = require('./userRoutes');


router.use('/users', userRoutes);
router.use('/subscriptions', subscriptionRoutes);


module.exports = router;
