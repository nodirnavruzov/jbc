const { Router } = require('express')
const { create, list, post, update } = require('../controllers/post')
const router = Router()

router.post('/list', list)
router.post('/create', create)
router.get('/:id', post)
router.put('/update/:id', update)

module.exports = router

