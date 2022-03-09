const Admin = require('../models/admin')
const { generateToken } = require('../service/token')

module.exports.addAdmin = async (req, res) => {
  try {
    const { email } = req.body
    const adminExists = await Admin.findOne({ email })
    if (adminExists) {
      res.status(409).json({ message: 'Admin already exists'})
    } else {
      const newAdmin = new Admin(req.body)
      Admin.addAdmin(newAdmin, (err, admin) => {
        if (err) {
          res.status(422).json({ message: 'Failed to create Admin. ' + err })
        } else {
          res.json({ message: 'Amin successfully added!' })
        }
      })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports.login = async (req, res) => {
  try {
    const {email, password} = req.body
    const admin = await Admin.findOne({email})
    if (admin) {
      Admin.comparePassword(password , admin.password, (err, result) => {
        if (!err) {
          generateToken(email, (err, token) => {
            if (err) throw new Error(err) 
            res.status(200).json({token})
          })
        } else {
          res.status(404).json({message: 'Please check your email or password'})
        }
      })
    } else {
      res.status(404).json({message: 'Please check your email or password'})
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

