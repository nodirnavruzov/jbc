const { Router } = require('express')
const { create, listActive, list, vacancy, update } = require('../controllers/vacancy')
const { createValidator } = require('../validators/vacancy')
const router = Router()

router.get('/', listActive)
router.get('/list', list)
router.post('/create', createValidator, create)
router.get('/:id', vacancy)
router.put('/update/:id', update)

module.exports = router

