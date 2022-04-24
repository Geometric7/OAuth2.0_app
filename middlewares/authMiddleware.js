exports.authorize = (req, res, next) => {
  if (!req.user) {
    res.redirect('/user/no-permission');
  } else {
    console.log(req.user);
    next();
  }
};
