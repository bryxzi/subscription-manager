const router = require('express').Router();
const { Subscription, User } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all subscriptions for a user
router.get('/', withAuth, async (req, res) => {
  try {
    // Get all subscriptions for the logged in user
    const subscriptions = await Subscription.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: ['name'] }],
    });

    // Serialize data so the template can read it
    const serializedSubscriptions = subscriptions.map((subscription) =>
      subscription.get({ plain: true })
    );

    // Pass serialized data and session flag into template
    res.render('subscription', {
      subscriptions: serializedSubscriptions,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// CREATE a new subscription
router.post('/', withAuth, async (req, res) => {
  try {
    // Create a new subscription using the data in the request body
    const newSubscription = await Subscription.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newSubscription);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// DELETE a subscription
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // Delete a subscription with the specified ID
    const subscriptionData = await Subscription.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!subscriptionData) {
      res.status(404).json({ message: 'No subscription found with this id!' });
      return;
    }

    res.status(200).json(subscriptionData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET a subscription by ID for editing
router.get('/:id/edit', withAuth, async (req, res) => {
  try {
    // Find the subscription with the specified ID
    const subscriptionData = await Subscription.findByPk(req.params.id);

    if (!subscriptionData) {
      res.status(404).json({ message: 'No subscription found with this id!' });
      return;
    }

    // Serialize data so the template can read it
    const subscription = subscriptionData.get({ plain: true });

    // Pass serialized data and session flag into template
    res.render('edit-subscription', {
      subscription,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// UPDATE a subscription
router.put('/:id', withAuth, async (req, res) => {
  try {
    // Update a subscription with the specified ID
    const subscriptionData = await Subscription.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!subscriptionData[0]) {
      res.status(404).json({ message: 'No subscription found with this id!' });
      return;
    }

    res.status(200).json(subscriptionData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router
