const multer = require("multer");
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (file.fieldname === 'avatar') {
      cb(null, "public/avatar/");
    } else if(file.fieldname === 'image') {
      // req.fieldname
      cb(null, "public/images/");
    }else {
      cb(new Error('Somethink wrong!!!'))
    }
  },

  filename(req, file, cb) {
    // const date = moment().format("DDMMYYYY-HHmmss_SSS");
    const uuid = uuidv4()
    const id = uuid.split('-').join('')
    const string = `${id}.jpg`
    cb(null, string);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
  // cb(new Error('I don\'t have a clue!'))
};

const limits = {
  fileSize: 1024 * 1025 * 5,
};

module.exports = multer({
  storage,
  fileFilter,
  limits,
});