'use strict'
module.exports.uploader = async (req, res) => {
  let url = `${process.env.HTTP_METHOD}://${process.env.HOST}`
  try {
    if (req.file.fieldname === 'avatar') {
      url = `${url}/avatar/`+req.file.filename
    } else if(req.file.fieldname === 'image') {
      url = `${url}/images/`+req.file.filename
    } else if (req.file.fieldname === 'resume') {
      url = `${url}/resume/`+req.file.filename
    }
    res.json({
      success: 1,
      file: {
        url,
      },
    });
  } catch (error) {
    res.status(500).json({ success: 0, message: "Something went wrong, please try again" });
  }
}