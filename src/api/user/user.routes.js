import express from 'express';
import passport from 'passport';
import debug from 'debug';
import validate from 'express-validation';
import * as controller from './user.controller';
import validation from './user.validation';
import wrapAsync from '../../helpers/wrapAsync';
import ACL from '../../lib/acl/casbin';

const router = express.Router();
const passportJWT = passport.authenticate('jwt', {
  session: false,
  failWithError: true,
});
const log = debug('user.routes'); // eslint-disable-line

// GET
router.get('/users', passportJWT, ACL, wrapAsync(controller.getAll));
router.get(
  '/users/:username',
  passportJWT,
  ACL,
  validate(validation.getUser),
  wrapAsync(controller.getUser),
);

// POST
router.post(
  '/users/register',
  ACL,
  validate(validation.register),
  wrapAsync(controller.register),
);

// PUT

// DELETE

export default router;
