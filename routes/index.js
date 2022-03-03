const { Router } = require('express')
const vacancyRoutes = require('./vacancy')
const employeesRoutes = require('./employees')
const uploaderRoutes = require('./uploader')

const router = Router()

// declare routes 
router.use('/vacancy', vacancyRoutes)
router.use('/employees', employeesRoutes)
router.use('/image', uploaderRoutes)

module.exports = router