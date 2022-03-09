const { body, validationResult } = require('express-validator');

module.exports.createAdmin = [
  body('email').exists().isEmail().withMessage('Email required'), 
  body('password').isLength({ min: 2, max: 15}).withMessage('password min: 2, max: 15 symbols'), 

  (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next()
  } else {
    res.status(400).json(errors)
  }
}]
