const { Router } = require('express')
const { create, listActive, list, vacancy, update, deleteVacancy, respond } = require('../controllers/vacancy')
const { createValidator } = require('../validators/vacancy')
const auth = require('../middleware/auth')
const router = Router()

router.get('/', listActive)
router.get('/list', list)
router.get('/:id', vacancy)

router.post('/create', auth, createValidator, create)
router.post('/respond', respond)

router.put('/update/:id', auth, update)
router.delete('/delete/:id', auth, deleteVacancy)

module.exports = router

