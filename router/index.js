import Router from 'express';
import userController from '../controllers/user-controller.js';
import ListickController from '../controllers/listick-controller.js';
import authMiddleware from '../middlewares/auth-middleware.js';
import {registerValidation, loginValidation, 
    saveListickVal, 
    validationRes} from '../validations/validations.js';

const router = new Router();

router.post('/registration', registerValidation, validationRes, userController.registration);
router.post('/login',        loginValidation,    validationRes, userController.login);
router.get('/logout',                                           userController.logout);
//router.get('/activate/:link', userController.activate);
router.get('/refresh',                                          userController.refresh);
router.get('/users',         authMiddleware,                    userController.getUsers);

router.get('/getAllListicks',authMiddleware,                                    ListickController.getAllListicks);
router.post('/saveListick',  authMiddleware,   saveListickVal, validationRes,   ListickController.saveListick);
router.delete('/deleteListick',authMiddleware,                  ListickController.deleteListick);


export default router;