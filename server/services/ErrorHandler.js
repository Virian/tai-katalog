function sendError (res, err, status) {
  console.error(err);
  res.status(status).send({ error: err.message });
}

module.exports = {
  sendError: sendError
}
