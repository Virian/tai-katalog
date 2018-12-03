const imageService = require('./ImageService');
const exifService = require('./ExifService');
const userService = require('./UserService');
const errorHandler = require('./ErrorHandler');

module.exports = {
  imageService: imageService,
  exifService: exifService,
  userService: userService,
  errorHandler: errorHandler,
};
