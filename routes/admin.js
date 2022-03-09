const { Router } = require('express')
const { addAdmin, login } = require('../controllers/admin')
const router = Router()
const auth = require('../middleware/auth')

router.post('/add-admin', auth, addAdmin)
router.post('/login', login)

module.exports = router

