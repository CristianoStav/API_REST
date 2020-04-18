import { Router } from 'express';
import SingUpController from '../controllers/SingUp';
import SingInController from '../controllers/SingIn';
import UserController from '../controllers/User';

const routes = Router();
const singUpController = new SingUpController();
const singInController = new SingInController();
const userController = new UserController();

routes.post('/sing-up', singUpController.singUp);
routes.post('/sing-in', singInController.singIn);
routes.get('/user/:_id', userController.getUSer);

export default routes;
