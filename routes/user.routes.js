const express = require('express');
const router = express.Router();
const { authorize } = require('../middlewares/authMiddleware');

router.get('/logged', authorize, (req, res) => {
  res.render('logged', {
    userName: req.user.displayName,
    image: req.user._json.picture,
  });
});

router.get('/no-permission', (req, res) => {
  res.render('noPermission');
});

router.get('/profile', authorize, (req, res) => {
  res.render('profile');
});

router.get('/profile/settings', authorize, (req, res) => {
  res.render('settings');
});

module.exports = router;
