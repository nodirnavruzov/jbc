module.exports.uploader = async (req, res) => {
  try {
    let url 
    if (req.file.fieldname === 'avatar') {
      url = `http://${process.env.HOST}:${process.env.PORT}/avatar/`+req.file.filename
    } else if(req.file.fieldname === 'image') {
      url = `http://${process.env.HOST}:${process.env.PORT}/images/`+req.file.filename
    } else if (req.file.fieldname === 'resume') {
      url = `http://${process.env.HOST}:${process.env.PORT}/resume/`+req.file.filename
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