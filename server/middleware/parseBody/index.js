/**
 * Parses a body property as if it were provided via a checkbox.
 * Checkbox input values are _not_ submitted if the checkbox is unselected
 * @param  {String} prop the object's property name
 * @return {Middleware}  a middleware function that parses the objects property
 */
export function parseCheckboxValue (prop) {
  if (!prop) {
    throw new Error('Property required');
  }

  return function ({ body }, res, next) {
    if (!body.hasOwnProperty(prop)) {
      body[prop] = false;
    } else {
      body[prop] = !!body[prop];
    }


    next();
  };
}
