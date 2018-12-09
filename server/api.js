const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const mkdirp = require('mkdirp');
const randomstring = require('randomstring');
const fs = require('fs');
const _ = require('lodash');
const { URLS } = require('./config');
const {
  uploadPhoto,
  photos,
  photo
} = URLS;

const {
  exifService,
  imageService,
  userService,
  errorHandler
} = require('./services');

const staticDirectory = './public';
const uploadDirectory = '/uploads';
const uploadPath = staticDirectory + uploadDirectory;

const Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const userId = req.userId;
    mkdirp.sync(uploadPath + '/' + userId);
    callback(null, uploadPath + '/' + userId);
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "_" + randomstring.generate(20) + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: Storage
}).single('file'); // parameter of `single` function is a field name in the upload form. They MUST be the same!

/**
 * Uploads a photo to the server, extracts it exif data and stores in the database.
 *
 * This function is authenticated. This means you must add 'X-Access-Token' header containing valid token to your request.
 */
router.post(uploadPhoto, userService.verifyToken, function (req, res) {
  upload(req, res, async function (err) {
    try {
      if (err) errorHandler.sendError(res, err, 500);
      const url = imageService.generateUrl(req);
      const imgBuffer = fs.readFileSync(req.file.path);
      const exifData = await exifService.getExifData(imgBuffer);
      const imgData = _.assign(exifData, { url: url, userId: req.userId });
      await imageService.save(imgData);
      res.send({ status: 'success' });
    } catch (err) {
      fs.unlinkSync(req.file.path);
      errorHandler.sendError(res, err, 500);
    }
  });
})

/**
 * Exemplary JSON:
 * {
 *  id: '123'
 * }
 *
 * This function is authenticated. This means you must add 'X-Access-Token' header containing valid token to your request.
 */
router.post(photo, userService.verifyToken, async function (req, res) {
  try {
    const imgId = req.body.id;
    const img = await imageService.findOne({
      where: {
        _id: imgId
      }
    });
    if (!img) errorHandler.sendError(res, new Error('There is no image with given id!'), 404);
    if (img.userId !== req.userId) errorHandler.sendError(res, new Error('You can only display your photos!'), 403);
    res.send(img);
  } catch (err) {
    errorHandler.sendError(res, err, 500);
  }
})

/**
 * Exemplary JSON:
 * {
 *  options: {
 *    where: {
 *      name: 'John',
 *      age: { $gt: 17, $lt: 66 }
 *    },
 *    select: { name: 1, school: 1},
 *    max: 5,
 *    offset: 10,
 *    sort: { age: -1 }
 *  }
 * }
 *
 * You can omit some parameters if you don't need them. Sending no params will result in listing all user's photos.
 * Max and offset are used for pagination.
 * For how to build complex queries using `where` object, see:
 * http://mongoosejs.com/docs/queries.html
 *
 * This function is authenticated. This means you must add 'X-Access-Token' header containing valid token to your request.
 */
router.post(photos, userService.verifyToken, async function (req, res) {
  try {
    const options = _.merge(req.body.options, { where: { userId: req.userId } });
    const images = await imageService.find(options);
    res.send(images);
  } catch (err) {
    errorHandler.sendError(res, err, 500);
  }
})

module.exports = router;
