const passport = require('passport');
const LocalStrategy = require('passport-local');
const JWTstrategy = require('passport-jwt');
const UserModel = require('../models/userModel');

module.exports = function localStrategyConfig() {
  passport.use(
    'signup',
    new LocalStrategy.Strategy(
      {
        usernameField: process.env.USER_EMAIL,
        passwordField: process.env.USER_PASSWORD,
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const existingUser = await UserModel.findOne({ email });
          if (existingUser) {
            return done(null, false, { message: 'User alredy exists' });
          }
          const user = await UserModel.create({
            email: email.toLowerCase(),
            password,
            username: req.body.username.toLowerCase(),
            favorites: req.body.favorites,
            bookings: req.body.bookings,
          });
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );

  passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: process.env.USER_EMAIL,
        passwordField: process.env.USER_PASSWORD,
      },
      async (email, password, done) => {
        try {
          const user = await UserModel.findOne({ email });

          if (!user) {
            return done(null, false, { message: 'User not found' });
          }

          const validate = await user.verifyPassword(password);

          if (!validate) {
            return done(null, false, { message: 'Wrong Password' });
          }

          return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
          return done(error);
        }
      },
    ),
  );

  passport.use(
    new JWTstrategy.Strategy(
      {
        secretOrKey: process.env.SECRET_KEY,
        jwtFromRequest: JWTstrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );
};
