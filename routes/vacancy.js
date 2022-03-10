const { Router } = require('express')
const { create, listActive, list, vacancy, update, deleteVacancy, respond } = require('../controllers/vacancy')
const { createValidator } = require('../validators/vacancy')
const { paramsValidator } = require('../validators/general')
const auth = require('../middleware/auth')
const router = Router()

router.get('/', listActive)
router.get('/list', list)
router.get('/:id', paramsValidator, vacancy)

router.post('/create', auth, createValidator, create)
router.post('/respond', respond)

router.put('/update/:id',  auth, paramsValidator, update)
router.delete('/delete/:id', auth, paramsValidator, deleteVacancy)

module.exports = router

