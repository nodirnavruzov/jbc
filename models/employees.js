'use strict'
const {model, Schema} = require('mongoose')

const employeesSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true 
  },
  to: {
    type: String,
    default: 'Current'
  },
  author: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

employeesSchema.methods.toJSON = function() {
  var obj = this.toObject()
  delete obj.__v
  return obj
}



module.exports = model("Employees", employeesSchema)
