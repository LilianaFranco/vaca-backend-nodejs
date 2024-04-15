class ConflictException extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

class BadRequestException extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class NotFoundException extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

export default {
  ConflictException,
  BadRequestException,
  NotFoundException,
};
