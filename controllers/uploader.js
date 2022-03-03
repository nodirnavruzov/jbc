module.exports.uploader = async (req, res) => {
  try {
    let url 
    if (req.file.fieldname === 'avatar') {
      url = `${process.env.HOST}:${process.env.PORT}/avatar/`+req.file.filename

    } else {
      url = `${process.env.HOST}:${process.env.PORT}/images/`+req.file.filename
    }
    res.json({
      success: 1,
      file: {
        url,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
}