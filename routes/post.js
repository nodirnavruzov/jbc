const { Router } = require('express')
const { create, list, post, update, deletePost } = require('../controllers/post')
const auth = require('../middleware/auth')
const { createPostValidator } = require('../validators/post')
const { paramsValidator } = require('../validators/general')

const router = Router()

router.post('/list', list)
router.post('/create', auth, createPostValidator, create)
router.get('/:id', paramsValidator, post)
router.put('/update/:id', auth, paramsValidator, update)
router.delete('/delete/:id', auth, paramsValidator, deletePost)

module.exports = router

