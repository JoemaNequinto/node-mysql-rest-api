import Joi from 'joi';

export default {
  getAll: {},
  getUser: {
    params: {
      username: Joi.string().required(),
    },
  },
  register: {
    body: {
      username: Joi.string().required(),
      role: Joi.string().required(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required(),
      confirmPassword: Joi.string().required(),
      name: Joi.string().required(),
    },
  },
};
