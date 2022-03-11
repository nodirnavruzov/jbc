'use strict'
const { verifyToken } = require('../service/token')

module.exports = (req, res, next) => {
  try {
    const bearerHeader = req.headers['authorization']
    if (bearerHeader) {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1]
      verifyToken(bearerToken, (err, decoded) => {
        if (!err) {
          res.status(200).json({state: true})
        } else {
          res.status(401).json({state: false})
        }
      })
    } else {
      throw new Error('authorization header required')
    }
  } catch (e) {
    res.status(401).json({
      state: false,
      error: "Unauthorized",
    })
  }

}