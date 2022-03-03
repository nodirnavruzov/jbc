const {model, Schema} = require('mongoose')

const vacancySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  salary: {
    type: {
      from: {
        type: Number,
      },
      to: {
        type: Number
      }
    },
  },
  skills: {
    type: [String],
    required: true
  },
  location: {
    type: String,
    default: 'Tashkent'
  },
  typeOfEmployment: {
    type: String,
    default: 'Full time'
  },
  description: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

vacancySchema.methods.toJSON = function() {
  var obj = this.toObject()
  delete obj.__v
  return obj
}

module.exports = model("Vacancy", vacancySchema)
