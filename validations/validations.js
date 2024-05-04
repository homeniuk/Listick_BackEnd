import { body, validationResult } from 'express-validator';

//User
export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 6 символов').isLength({min: 6, max: 32}),
];
export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 6 символов').isLength({ min: 6 }),
];

export const validationRes = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      
      let message = '';
      for(const err of errors.array()) {
        if (message)
          message = message + ', ';
        message = message + err.msg;
      }
      return res.status(400).json({message});
    }
  
    next();
};