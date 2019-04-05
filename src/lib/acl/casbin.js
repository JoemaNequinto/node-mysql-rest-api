import path from 'path';
import HTTPStatus from 'http-status';
import { newEnforcer } from 'casbin';
import { APIClientError } from '../../helpers/APIResponse';

export default async (req, res, next) => {
  const enforcer = await newEnforcer(
    path.join(__dirname, 'model.conf'),
    path.join(__dirname, 'policy.csv'),
  );
  const role = req.user ? req.user.role : 'guest';
  const { url, method } = req;

  if (enforcer.enforce(role, url, method)) {
    return next();
  }

  const response = new APIClientError(
    {
      message: 'Your role does not have access to this route.',
    },
    HTTPStatus.UNAUTHORIZED,
    HTTPStatus['401'],
  );

  return res.send(response.jsonify());
};
