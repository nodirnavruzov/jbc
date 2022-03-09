const {model, Schema} = require('mongoose')
const bcrypt = require('bcrypt')

const adminSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: Number,
    required: false
  }
}, {
  timestamps: true,
})

const Admin = module.exports = model("Admin", adminSchema)

module.exports.addAdmin = function(newAdmin, callback) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        callback(err)
      } else {
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
          newAdmin.password = hash
          newAdmin.save(callback)
        })
      }
    })
}

module.exports.setPassword = function(user, newPass, callback) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        callback(err)
      } else {
        bcrypt.hash(newPass, salt, (err, hash) => {
          user.password = hash
          user.save(callback)
        })
      }
    })
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if(err) {
        callback(err)
      } else {
        callback(null, isMatch)
      }
    })
}