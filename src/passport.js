import passport from 'passport';
import debug from 'debug';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import models from './models';

const log = debug('passport');  // eslint-disable-line
const User = models.user;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const localOptions = {
  usernameField: 'email',
};

// JWT Strategy
passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      // Find the user specified in the token
      const user = await User.findByPk(payload.sub);

      // Check if user does not exists
      if (!user) {
        return done(null, false);
      }

      // Return the user if it exists
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }),
);

// Local Strategy
passport.use(
  new LocalStrategy(localOptions, async (email, password, done) => {
    try {
      // Check if the email exists
      const user = await User.findOne({
        where: { email },
      });

      // Check if the user does not exists given the email
      if (!user) {
        return done(null, false);
      }

      // Check if the password is correct
      const validPassword = await user.isValidPassword(password);

      if (!validPassword) {
        return done(null, false);
      }

      // Return the user details if the password and email is correct
      // req.user now contains the user details
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }),
);
