function errorHandler(error, req, res, next) {
  console.error(error);
  if (error.statusCode && error.customMessage) {
    return res.status(error.statusCode).send(error.customMessage);
  }
  res.status(500).send('Internal Server Error');
}

module.exports = errorHandler;