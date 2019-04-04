/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "next" }] */
/* eslint no-underscore-dangle: ["error", { "allow": ["result_", "_id"] }] */
import debug from 'debug';
import expressValidation from 'express-validation';
import { generateToken } from '../../helpers/authentication';
import { APISuccess, APIClientError } from '../../helpers/APIResponse';

const log = debug('auth.controller'); // eslint-disable-line

/**
 * @api {post} /auth/login  Login
 * @apiName Login
 * @apiGroup Auth
 *
 * @apiSuccess {Number} status      Status Code of the response
 * @apiSuccess {String} statusText  Status Text of the response
 * @apiSuccess {Object} data        Data of the response
 * @apiSuccess {String} data.token  JSON Web Token of the authenticated user
 *
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "status": 200,
 *      "statusText": "OK",
 *      "data": {
 *        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *            .eyJzdWIiOiI1OWI0ZDY3NzA3NmI4OTE4YTc4NDFlNzMiLCJpYXQiOjE1MDcwMTY5NDcsImV4cCI6MTUwNzAyMDU0N30
 *            .VbhHJuYU8wfAP3VvYk80e3wskL5kzkqlDdrrcINjcSo"
 *      }
 *    }
 *
 * @apiError {String} name          Name of the error
 * @apiError {Number} status        Status Code of the response
 * @apiError {String} statusText    Status Text of the response
 * @apiError {String} error         Data of the error
 * @apiError {String} error.message Message of the error
 *
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 401 UNAUTHORIZED
 *    {
 *      "name": "APIClientError",
 *      "status": 401,
 *      "statusText": "Unauthorized",
 *      "error": {
 *        "message": "Passport.js authentication failed."
 *      }
 *    }
 */
export const login = async (req, res, next) => {
  try {
    const token = generateToken({
      sub: req.user.id,
    });

    const response = new APISuccess({
      token,
    });
    res.json(response.jsonify());
  } catch (err) {
    if (
      !(
        err instanceof APIClientError ||
        err instanceof expressValidation.ValidationError
      )
    ) {
      throw new Error(err);
    } else {
      throw err;
    }
  }
};

/**
 * @api {get} /auth/logout  Logout
 * @apiName Logout
 * @apiGroup Auth
 *
 * @apiSuccess {Number} status        Status Code of the response
 * @apiSuccess {String} statusText    Status Text of the response
 * @apiSuccess {Object} data          Data of the response
 * @apiSuccess {String} data.message  Message of the response
 *
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "status": 200,
 *      "statusText": "OK",
 *      "data": {
 *        "message": "Successfully logged out."
 *      }
 *    }
 *
 * @apiError {String} name          Name of the error
 * @apiError {Number} status        Status Code of the response
 * @apiError {String} statusText    Status Text of the response
 * @apiError {String} error         Data of the error
 * @apiError {String} error.message Message of the error
 *
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 401 UNAUTHORIZED
 *    {
 *      "name": "APIClientError",
 *      "status": 401,
 *      "statusText": "Unauthorized",
 *      "error": {
 *        "message": "Passport.js authentication failed."
 *      }
 *    }
 */
export const logout = async (req, res, next) => {
  try {
    // req.user will be null after invoking the logout method
    req.logout();

    const response = new APISuccess({
      message: 'Successfully logged out.',
    });
    res.json(response.jsonify());
  } catch (err) {
    if (
      !(
        err instanceof APIClientError ||
        err instanceof expressValidation.ValidationError
      )
    ) {
      throw new Error(err);
    } else {
      throw err;
    }
  }
};
