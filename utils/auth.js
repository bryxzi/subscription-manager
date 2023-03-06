const withAuth = (req, res, next) => {
  // Skip authentication for the login page
  if (req.path === '/login') {
    return next();
  }

  // Redirect to the login page if the user is not logged in
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
