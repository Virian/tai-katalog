const exec = require('child_process').exec;
const { Image } = require('../models');

function save (data) {
  return new Promise(function (resolve, reject) {
    const image = new Image(data);
    image.save(function (err) {
      if (err) reject(err);
      resolve();
    });
  })
}

function update (id, data) {
  return new Promise(function (resolve, reject) {
    Image.update({ _id: id }, { $set: data }, function (err) {
      if (err) reject(err);
      resolve();
    })
  })
}

function find (options) {
  return new Promise(function (resolve, reject) {
    Image
      .find(options.where)
      .select(options.select)
      .limit(options.max > -1 ? options.max : null)
      .skip(options.offset > -1 ? options.offset : null)
      .sort(options.sort)
      .exec(function (err, images) {
        if (err) reject(err);
        resolve(images)
      })
  })
}

function findOne (options) {
  return new Promise(function (resolve, reject) {
    Image
      .findOne(options.where)
      .select(options.select)
      .exec(function (err, image) {
        if (err) reject(err);
        resolve(image)
      })
  })
}

function generateUrl (req) {
  const host = req.hostname;
  const port = '4000'; // idk if I can get it from somewhere
  let filePath = req.file.path.replace(/\\/g, '/'); // replace all occurences of '\' with '/'
  filePath = filePath.replace('public/', '');
  return req.protocol + "://" + host + ':' + port + '/' + filePath;
}

function classifyImage (filePath, callback) {
  let cmd = 'python classify_image.py --image_file ' + filePath
  exec(cmd, function(error, stdout, stderr) {
    let classesString = '';
    if (error) console.log(stderr);
    else classesString = getGoogleInceptionClasses(stdout, 0.1);
    callback(classesString);
  });
}

function getGoogleInceptionClasses (input, threshold) {
  let returnString = '';
  const classes = input.split('\r\n');
  for (classString of classes) {
    if (classString.length === 0) continue;
    const eqIdx = classString.lastIndexOf('=');
    const score = parseFloat(classString.slice(eqIdx + 2, classString.length - 2));
    if (score < threshold) continue;
    if (returnString.length > 0) returnString += ', ';
    returnString += classString.slice(0, classString.indexOf('(') - 1);
  }
  return returnString;
}

module.exports = {
  save: save,
  update:update,
  find: find,
  findOne: findOne,
  generateUrl: generateUrl,
  classifyImage: classifyImage,
  getGoogleInceptionClasses: getGoogleInceptionClasses
}
