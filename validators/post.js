'use strict'
const { body, validationResult } = require('express-validator');

module.exports.createPostValidator = [
  body('title').exists().withMessage('title required'), 
  body('title').isLength({ min: 2, max: 150}).withMessage('title min: 2, max: 150 symbols'),

  body('text').not().isEmpty(),

  (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next()
  } else {
    res.status(400).json(errors)
  }
}] 
