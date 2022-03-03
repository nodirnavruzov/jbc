const { body, validationResult } = require('express-validator');
const Vacancy = require('../models/vacancy')
module.exports.createValidator = [
  body('title').exists().withMessage('title required'), 
  body('title').isLength({ min: 2, max: 15}).withMessage('title min: 2, max: 15 symbols'), 

  body('salary').exists().withMessage('salary required'), 
  body('salary').isLength({ min: 2, max: 15}).withMessage('salary min: 2, max: 15 symbols'), 

  body('skills').exists().withMessage('skills required'), 

  body('location').exists().withMessage('location required'), 
  body('location').isLength({ min: 5, max: 30}).withMessage('location min: 5, max: 30 symbols'),

  body('typeOfEmployment').exists().withMessage('typeOfEmployment required'), 
  body('typeOfEmployment').isLength({ min: 5, max: 30}).withMessage('typeOfEmployment min: 5, max: 30 symbols'),

  body('description').exists().withMessage('description required'), 
  body('description').isLength({ min: 5}).withMessage('description min: 5, max: 30 symbols'), 
  
  (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next()
  } else {
    res.status(400).json(errors)
  }
}] 
