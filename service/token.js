const jwt = require('jsonwebtoken')

module.exports.generateToken = (payload, callback) => {
  jwt.sign({ email: payload.email, id: payload._id }, process.env.SECRET_KEY_TOKEN, { expiresIn: '30d' },function(err, token) {
    if (!err) {
      callback(null, token)
    } else {
      callback(err)
    }
  });
}
module.exports.verifyToken = (token, callback) => {
  jwt.verify(token, process.env.SECRET_KEY_TOKEN, function(err, decoded) {
    if (!err) {
      callback(null, decoded)
    } else {
      callback(err)
    }
  })
}