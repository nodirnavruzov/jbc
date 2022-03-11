'use strict'
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (file.fieldname === 'avatar') {
      cb(null, 'public/avatar/');
    } else if(file.fieldname === 'image') {
      cb(null, 'public/images/');
    } else if(file.fieldname === 'resume') {
      cb(null, 'public/resume/');
    } else {
      cb(new Error('Somethink wrong!!!'))
    }
  },

  filename(req, file, cb) {
    let string
    const uuid = uuidv4()
    if (file.mimetype === 'application/pdf') {
      const id = uuid.split('-').join('')
      string = `${id}.pdf`
    } else {
      const id = uuid.split('-').join('')
      string = `${id}.jpg`
    }
    cb(null, string);
  },
})

const fileFilter = (req, file, cb) => {
  const format = file.mimetype.split("/")[1]
  if (
    format === "png"  ||
    format === "jpeg" ||
    format === "jpg"  || 
    format === "pdf" 
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const limits = {
  fileSize: 1024 * 1025 * 5,
}

module.exports = multer({
  storage,
  fileFilter,
  limits,
})