/**
 * Validates that an object's property is of the correct length
 * @param  {String} prop the object's property name
 * @return {Middleware}  a middleware function that validates the length is not too long
 */
export function validateLength (prop, _options = {}) {
  const options = {
    min: _options.min || 0,
    max: _options.max || Infinity,
  };

  if (!prop) {
    throw new Error('Property required');
  }

  return function ({ body }, res, next) {
    if (!body.hasOwnProperty(prop)) {
      return next();
    }

    const s = body[prop].toString();

    if (s.length > options.max) {
      throw new Error(`\`${prop}\` cannot be longer than ${options.max} characters`);
    }

    if (s.length < options.min) {
      throw new Error(`\`${prop}\` must be at least ${options.min} characters`);
    }

    next();
  };
}
