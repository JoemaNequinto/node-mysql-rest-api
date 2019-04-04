/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "next" }] */
/* eslint no-underscore-dangle: ["error", { "allow": ["result_", "_id"] }] */
import debug from 'debug';
// import nodemailer from 'nodemailer';
// import uuidv4 from 'uuid';
import expressValidation from 'express-validation';
import Sequelize from 'sequelize';
import models from '../../models';
import { generateToken } from '../../helpers/authentication';
import { APISuccess, APIClientError } from '../../helpers/APIResponse';

const log = debug('user.controller'); // eslint-disable-line
const { Op } = Sequelize;
const User = models.user;

/**
 * @api {get} /users   GetAll
 * @apiName GetAll
 * @apiGroup User
 *
 * @apiSuccess {Number} status                Status Code of the response
 * @apiSuccess {String} statusText            Status Text of the response
 * @apiSuccess {Object} data                  Data of the response
 * @apiSuccess {Object[]} data.data           Array of User
 * @apiSuccess {String} data.data.id          UUID
 * @apiSuccess {String} data.data.username    User username
 * @apiSuccess {String} data.data.email       User email
 * @apiSuccess {String} data.data.password    User hashed password
 * @apiSuccess {String} data.data.name        User name
 *
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "status": 200,
 *      "statusText": "OK",
 *      "data": {
 *        "data": [
 *          {
 *            "id": "59b4d677076b8918a7841e73",
 *            "username": "joemanequinto",
 *            "email": "janequinto@codedisruptors.com",
 *            "password": "$2a$10$dxy4cTXzH1rNMeJ46erDaeF/TyRbjA/qjCvpuFeMip.lvqhV4tzTW",
 *            "name": "Joema Nequinto"
 *          },
 *          {
 *            "id": "59b53be1e161e34bfba5c4b2",
 *            "username": "johndoe",
 *            "email": "johndoe@gmail.com",
 *            "password": "$2a$10$Abv87/OZI4TAsZ5Nu5Nwd.fs/aMSXQqBZVWtV3CsqYp/O/zOnGscC",
 *            "name": "John Doe",
 *          }
 *        ]
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
export const getAll = async (req, res, next) => {
  try {
    const users = await User.findAll();

    const response = new APISuccess({
      data: users,
    });

    res.send(response.jsonify());
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
 * @api {get} /users/:username     GetUser
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiSuccess {Number} status                Status Code of the response
 * @apiSuccess {String} statusText            Status Text of the response
 * @apiSuccess {Object} data                  Data of the response
 * @apiSuccess {Object} data.data             User data
 * @apiSuccess {String} data.data.id          UUID
 * @apiSuccess {String} data.data.username    User username
 * @apiSuccess {String} data.data.email       User email
 * @apiSuccess {String} data.data.password    User hashed password
 * @apiSuccess {String} data.data.name        User name
 *
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "status": 200,
 *      "statusText": "OK",
 *      "data": {
 *        "data": {
 *            "id": "59b4d677076b8918a7841e73",
 *            "username": "joemanequinto",
 *            "email": "janequinto@codedisruptors.com",
 *            "password": "$2a$10$dxy4cTXzH1rNMeJ46erDaeF/TyRbjA/qjCvpuFeMip.lvqhV4tzTW",
 *            "name": "Joema Nequinto",
 *        }
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
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
    });

    const response = new APISuccess({ data: user });

    res.send(response.jsonify());
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
 * @api {post} /users/register      Register
 * @apiName Register
 * @apiGroup User
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
export const register = async (req, res, next) => {
  try {
    // Check if password and confirmPassword are the same
    if (req.body.password !== req.body.confirmPassword) {
      throw new APIClientError({
        message: 'Passwords do not match.',
      });
    }

    // Check if the email or username already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          {
            email: req.body.email,
          },
          {
            username: req.body.username,
          },
        ],
      },
    });

    // If another user with the same username of email already exists
    if (existingUser) {
      if (existingUser.email === req.body.email) {
        throw new APIClientError({
          message: 'Email already exists.',
        });
      }

      if (existingUser.username === req.body.username) {
        throw new APIClientError({
          message: 'Username already exists.',
        });
      }
    }

    const user = {
      username: req.body.username,
      role: req.body.role,
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    };

    const result = await User.create(user);

    const token = generateToken({
      sub: result.id,
    });

    const response = new APISuccess({
      token,
    });
    return res.send(response.jsonify());
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
