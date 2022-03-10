const { Router } = require('express')
const vacancyRoutes = require('./vacancy')
const employeesRoutes = require('./employees')
const uploaderRoutes = require('./uploader')
const adminRoutes = require('./admin')
const postRoutes = require('./post')
const { sendContact } =  require('../service/email')

const router = Router()

// declare routes 
router.use('/vacancy', vacancyRoutes)
router.use('/employees', employeesRoutes)
router.use('/upload', uploaderRoutes)
router.use('/post', postRoutes)
router.use('/admin', adminRoutes)
router.use('/contact', (req, res) => {
    sendContact(req.body, (err, _) => {
      if (!err) {
        res.status(200).json({message: 'message successfully send'})
      } else {
        res.status(500).json({message: 'Somethink wrong, please try again'})
      }
    })
})

module.exports = router