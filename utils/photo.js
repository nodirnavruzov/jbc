const fs = require('fs')
const path = require('path')


module.exports.deletePhoto = async (data) => {
  const photo = data.photo.split('/')
  const photoDir = photo[photo.length -2]
  const photoName = photo[photo.length -1]
  const photoPath = path.join(__dirname, `../public/${photoDir}/${photoName}`)
  fs.unlink(photoPath, (err) => {
    if (!err) {
      console.log('Photo deleted: ', photoName)
    } else {
      console.log(`Photo can't delete - ${err.Error}`)
    }
  }) 
}