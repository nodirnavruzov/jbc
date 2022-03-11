'use strict'
const { validationResult, param } = require('express-validator');

module.exports.paramsValidator = [
  param('id')
   .isMongoId().withMessage('Params id required'),
  (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next()
  } else {
    res.status(400).json(errors)
  }
}]
