const { Router } = require('express')
const { addAdmin, login } = require('../controllers/admin')
const router = Router()
const auth = require('../middleware/auth')
const checkAuth = require('../middleware/checkAuth')

router.post('/add-admin', auth, addAdmin)
router.post('/login', login)
router.post('/auth', checkAuth)

module.exports = router

