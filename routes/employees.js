const { Router } = require('express')
const router = Router()
const { create, get, list, update, deleteEmployee } = require('../controllers/employees')
const { createEmployeeValidator } = require('../validators/employees')
const { paramsValidator } = require('../validators/general')
const auth = require('../middleware/auth')

router.post('/create', auth, createEmployeeValidator, create)
router.get('/:id', paramsValidator,  get)
router.post('/list', list)
router.put('/update/:id', auth, paramsValidator, update)
router.delete('/delete/:id', auth, paramsValidator, deleteEmployee)


 
module.exports = router

