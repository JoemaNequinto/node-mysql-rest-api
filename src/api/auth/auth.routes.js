import express from 'express';
import passport from 'passport';
import debug from 'debug';
import validate from 'express-validation';
import * as controller from './auth.controller';
import validation from './auth.validation';
import wrapAsync from '../../helpers/wrapAsync';

const router = express.Router();

const passportLocal = passport.authenticate('local', {
  session: false,
  failWithError: true,
});

const passportJWT = passport.authenticate('jwt', {
  session: false,
  failWithError: true,
});
const log = debug('auth.routes'); // eslint-disable-line

// GET
router.get('/auth/logout', passportJWT, wrapAsync(controller.logout));

// POST
router.post(
  '/auth/login',
  validate(validation.login),
  passportLocal,
  wrapAsync(controller.login),
);

// PUT

// DELETE

export default router;
