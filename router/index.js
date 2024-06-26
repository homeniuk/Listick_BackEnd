import Router from 'express';
import userController from '../controllers/user-controller.js';
import authMiddleware from '../middlewares/auth-middleware.js';
import {registerValidation, loginValidation, validationRes} from '../validations/validations.js';

const router = new Router();

router.post('/registration', registerValidation, validationRes, userController.registration);
router.post('/login',        loginValidation,    validationRes, userController.login);
router.post('/logout',                                          userController.logout);
//router.get('/activate/:link', userController.activate);
router.get('/refresh',                                          userController.refresh);
router.get('/users',        authMiddleware,                     userController.getUsers);

export default router;