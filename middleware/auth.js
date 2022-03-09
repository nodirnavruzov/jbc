const { verifyToken } = require('../service/token')

module.exports = (req, res, next) => {
  try {
    const bearerHeader = req.headers['authorization']
    if (bearerHeader) {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1]
      verifyToken(bearerToken, (err, decoded) => {
        if (!err) {
          req.token = bearerToken
          next()
        } else {
          throw new Error()
        }
      })
    } else {
      throw new Error()
    }
  } catch (e) {
    res.status(401).json({
      error: "Unauthorized",
    })
  }

}