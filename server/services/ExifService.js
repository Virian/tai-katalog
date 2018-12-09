const { ExifImage } = require('exif');

function getExifData (image) {
  return new Promise(function (resolve, reject) {
    new ExifImage({ image : image }, function (err, exifData) {
      if (err) {
        reject(err);
      } else {
        resolve(exifData);
      }
    });
  })
}

module.exports = {
  getExifData: getExifData
}
