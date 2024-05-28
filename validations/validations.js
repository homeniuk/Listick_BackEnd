import { body, query, validationResult } from 'express-validator';

//User
export const registerValidation = [
    body('email', 'Invalid mail format').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({min: 6, max: 32}),
];
export const loginValidation = [
    body('email', 'Invalid mail format').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6, max: 32 }),
];

export const saveListickVal = [
  body('id', 'id is required').isInt(),
  body('top', 'top is required').isInt(),
  body('left', 'left is required').isInt(),
  body('text', 'text is required').isString(),
];

export const deleteListickVal = [
  query('id', 'id is required').notEmpty(),
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
