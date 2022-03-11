var express = require("express");
var router = express.Router();
const { uploader } = require('../controllers/uploader')
const auth = require('../middleware/auth')
const upload = require("../middleware/upload");

router.post('/image', auth, upload.single('image'), uploader);
router.post('/avatar', auth, upload.single('avatar'), uploader);
router.post('/resume', upload.single('resume'), uploader);

module.exports = router;