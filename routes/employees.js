const { Router } = require('express')
const router = Router()
const { create, get, list, update, deleteEmployee } = require('../controllers/employees')
const { createEmployees } = require('../validators/employees')
const auth = require('../middleware/auth')

router.post('/create', auth, createEmployees, create)
router.get('/:id', get)
router.post('/list', list)
router.put('/update/:id', auth, update)
router.delete('/delete/:id', auth, deleteEmployee)


 
module.exports = router

