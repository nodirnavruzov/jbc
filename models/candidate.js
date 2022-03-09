const {model, Schema} = require('mongoose')

const candidaeSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  cv: {
    type: String,
    required: false
  },
  coverLetter: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
})

const Candidae = module.exports = model("Candidae", candidaeSchema)

