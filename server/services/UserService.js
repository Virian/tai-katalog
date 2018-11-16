const jwt = require('jsonwebtoken');
const { tokenKey } = require('../config');
const { User } = require('../models');

function save (data) {
  return new Promise(function (resolve, reject) {
    const user = new User(data);
    user.save(function (err, user) {
      if (err) reject(err);
      resolve(user);
    });
  })
}

function findOne (options) {
  return new Promise(function (resolve, reject) {
    User
      .findOne(options.where)
      .select(options.select)
      .exec(function (err, user) {
        if (err) reject(err);
        resolve(user)
      })
  })
}

function verifyToken (req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(400).send({ error: 'No token provided.' });
  jwt.verify(token, tokenKey, function(err, decoded) {
    if (err) return res.status(401).send({ error: 'Failed to authenticate token.' });
    req.userId = decoded.id;
    next();
  });
}

module.exports = {
  save: save,
  findOne: findOne,
  verifyToken: verifyToken
}
