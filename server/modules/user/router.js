import {
  Router
} from 'express';
// import auth from './auth';
import * as userController from './controller';


import jwt from 'express-jwt';
const getTokenFromHeaders = (req) => {
  const {
    headers: {
      authorization
    }
  } = req;

  if (authorization && authorization.split(' ')[0] === 'Token')
    return authorization.split(' ')[1];
  return null;
};

const auth = {
  required: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};





const router = new Router();

//POST new user route (optional, everyone has access)
router.post('/register', auth.optional, userController.registerUser);

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, userController.loginUser);

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, userController.current);

export default router;
