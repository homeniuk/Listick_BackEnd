import { body, validationResult } from 'express-validator';

//User
export const registerValidation = [
    body('email', 'Invalid mail format').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({min: 6, max: 32}),
];
export const loginValidation = [
    body('email', 'Invalid mail format').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6, max: 32 }),
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