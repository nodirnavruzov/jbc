const { Router } = require('express')
const { create, list, post, update, deletePost } = require('../controllers/post')
const auth = require('../middleware/auth')
const router = Router()

router.post('/list', list)
router.post('/create', auth, create)
router.get('/:id', post)
router.put('/update/:id', auth, update)
router.delete('/delete/:id', auth, deletePost)

module.exports = router

