const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res) => {
    res.json({
      message: 'Signup successful',
      user: req.user,
    });
  },
);

router.post(
  '/login',
  async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user) => {
        try {
          if (err || !user) {
            const error = new Error('An error occurred.');

            return next(error);
          }

          return req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);

              const body = { _id: user._id, email: user.email };
              const token = jwt.sign({ user: body }, process.env.SECRET_KEY);

              return res.json({ token, user });
            },
          );
        } catch (error) {
          return res.status;
        }
      },
    )(req, res, next);
  },
);

router.get(
  '/logout', (req, res) => {
    req.logout();
    res.json({ logout: 'ok' });
  },
);

module.exports = router;
