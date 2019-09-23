console.log('exceptions.js is loading...');

class ExtendableError extends Error {
  constructor(message) {
    if (new.target === ExtendableError)
      throw new TypeError('Abstract class "ExtendableError" cannot be instantiated directly.');
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    Error.captureStackTrace(this, this.contructor);
  }
}

// 400 Bad Request
class BadRequest extends ExtendableError {
  constructor(m) {
    if (arguments.length === 0) super('Bad request');
    else super(m);
  }
}

// 401 Unauthorized
class Unauthorized extends ExtendableError {
  constructor(m) {
    if (arguments.length === 0) super('Unauthorized');
    else super(m);
  }
}

// 403 Forbidden
class Forbidden extends ExtendableError {
  constructor(m) {
    if (arguments.length === 0) super('Forbidden');
    else super(m);
  }
}

// 404 Not Found
class NotFound extends ExtendableError {
  constructor(m) {
    if (arguments.length === 0) super('Not Found');
    else super(m);
  }
}

// 409 Conflict
class Conflict extends ExtendableError {
  constructor(m) {
    if (arguments.length === 0) super('Conflict');
    else super(m);
  }
}

// 422 Unprocessable Entity
class UnprocessableEntity extends ExtendableError {
  constructor(m) {
    if (arguments.length === 0) super('Unprocessable Entity');
    else super(m);
  }
}

// 500 Internal Server Error
class InternalServerError extends ExtendableError {
  constructor(m) {
    if (arguments.length === 0) super('Internal Server Error');
    else super(m);
  }
}

// ECONNREFUSED
class RefusedConnection extends ExtendableError {
  constructor(m) {
    if (arguments.length === 0) super('Refused Connection');
    else super(m);
  }
}
/*
const handleAppError = err => {
  if (err instanceof BadRequest) return res.status(HttpStatus.BAD_REQUEST).send({ message: err.message }); // 400
  if (err instanceof Forbidden) return res.status(HttpStatus.FORBIDDEN).send({ message: err.message }); // 403
  if (err instanceof NotFound) return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
  if (err instanceof UnprocessableEntity)
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ message: err.message }); // 422

  console.log(err);
  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
};
*/

const handleError = (msg, err) => {
  console.log('\x1b[37m\x1b[41m%s\x1b[0m', `${msg} - Message: \'${err.message}\'`);
};

module.exports.BadRequest = BadRequest;
module.exports.Unauthorized = Unauthorized;
module.exports.Forbidden = Forbidden;
module.exports.NotFound = NotFound;
module.exports.Conflict = Conflict;
module.exports.UnprocessableEntity = UnprocessableEntity;
module.exports.InternalServerError = InternalServerError;
module.exports.RefusedConnection = RefusedConnection;

module.exports.handleError = handleError;
