var express = require("express");
var router = express.Router();
const { uploader } = require('../controllers/uploader')
const upload = require("../middleware/upload");

router.post('/upload-image', upload.single('image'), uploader);
router.post('/upload-avatar', upload.single('avatar'), uploader);

module.exports = router;