const nodemailer = require("nodemailer")
const {vacancy, contact} = require('../templates/getHtml')
module.exports.sendCv = async (payload, callback) => {
  try {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // no need to set host or port etc.ed to set host or port etc.
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_LOGIN,
        pass: process.env.EMAIL_PASSWORD,
      }
    });
    transporter.verify( async (error, success) => {
      if (error) {
        callback(error)
      } else {
        let info = await transporter.sendMail({
          from: 'JBC',
          to: process.env.EMAIL,
          subject: payload.title,
          html: vacancy(payload)
        });
        callback(null, info)
      }
    });
  } catch (error) {
    callback(error)
  }
}
module.exports.sendContact = async (payload, callback) => {
  try {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // no need to set host or port etc.ed to set host or port etc.
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_LOGIN,
        pass: process.env.EMAIL_PASSWORD,
      }
    });
    transporter.verify( async (error, success) => {
      if (error) {
        callback(error)
      } else {
        let info = await transporter.sendMail({
          from: 'JBC',
          to: process.env.EMAIL,
          subject: payload.fullName,
          html: contact(payload)
        });
        callback(null, info)
      }
    });
  } catch (error) {
    callback(error)
  }
}
