const { body, validationResult } = require('express-validator');


module.exports.createEmployees = [
  body('firstName').exists().withMessage('firstName required'), 
  body('firstName').isLength({ min: 2, max: 15}).withMessage('firstName min: 2, max: 15 symbols'), 

  body('lastName').exists().withMessage('lastName required'), 
  body('lastName').isLength({ min: 2, max: 15}).withMessage('lastName min: 2, max: 15 symbols'), 

  body('position').exists().withMessage('position required'), 
  body('position').isLength({ min: 5, max: 30}).withMessage('position min: 5, max: 30 symbols'), 
  
  body('from').exists().withMessage('from required'), 
  (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next()
  } else {
    res.status(400).json(errors)
  }
}]
