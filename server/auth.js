const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {
  tokenKey,
  URLS
} = require('./config');
const {
  register,
  login
} = URLS;
const {
  userService,
  errorHandler
} = require('./services');

/**
 * Exemplary JSON:
 * {
 *  email: 'a@a.com',
 *  password: 'pass',
 *  confirmPassword: 'pass'
 * }
 *
 * Creates a user in the database. This function checks if all parameters are present and if passwords are the same.
 * It doesn't validate if the email is in proper format.
 */
router.post(register, async function (req, res) {
  try {
    if (!req.body.password || !req.body.confirmPassword || !req.body.email) errorHandler.sendError(res, new Error('Please provide all data'), 400);
    if (req.body.password !== req.body.confirmPassword) errorHandler.sendError(res, new Error('Passwords don\'t match!'), 500);

    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    await userService.save({ email: req.body.email, password: hashedPassword });
    res.send({ status: 'success' });
  } catch (err) {
    errorHandler.sendError(res, err, 500);
  }
});

/**
 * Exemplary JSON:
 * {
 *  email: 'a@a.com',
 *  password: 'pass'
 * }
 *
 * Checks if the user with given credentials exists in the database and if they are correct. If so, returns token that
 * is valid for 24 hours.
 */
router.post(login, async function (req, res) {
  try {
    const user = await userService.findOne({ where: { email: req.body.email } });
    if (!user) errorHandler.sendError(res, new Error('No user found.'), 404);

    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
    if (!isPasswordValid) errorHandler.sendError(res, new Error('Wrong password'), 401);

    const token = jwt.sign({ id: user._id }, tokenKey, {
      expiresIn: 86400 // 24h in seconds
    });
    res.send({ token: token });
  } catch (err) {
    errorHandler.sendError(res, err, 500);
  }
});

module.exports = router;
