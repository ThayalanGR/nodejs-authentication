import {
  Router
} from 'express';
import * as userController from './controller';
import auth from '../../config/authtoken';

const routes = new Router();

//POST new user route (optional, everyone has access)
routes.post('/register', auth.optional, userController.registerUser);

//POST login route (optional, everyone has access)
routes.post('/login', auth.optional, userController.loginUser);

//GET current route (required, only authenticated users have access)
routes.get('/current/:id', auth.required, userController.current);

export default routes;
