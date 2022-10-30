class NotFoundError extends Error {
  constructor() {
    super('Not Found');
    this.statusCode = 404;
    this.customMessage = 'Not Found';
  }
}

class ForbiddenError extends Error {
  constructor() {
    super('Forbidden');
    this.statusCode = 403;
    this.customMessage = 'Forbidden';
  }
}

module.exports = {
  NotFoundError,
  ForbiddenError,
};