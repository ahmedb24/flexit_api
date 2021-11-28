/*
 * Validators of various sorts.
 * 
 *
 */

const lib = {};

// Other patterns may be added.
lib.validateByRegex = (candidate, pattern) => {
  const re = {
    'email' : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    'phone' : /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[(]?(080|090|070){1}[)]?[-\s\.]?[0-9]{8}$/
  };

  if (re[pattern] instanceof RegExp) {
    if(re[pattern].test(candidate)) {
      return candidate;
    }
  }
  return false;
};

lib.validateString = candidate => {
  return typeof(candidate) == 'string' ? candidate : false;
};

lib.validateNumber = candidate => {
  return typeof(candidate) == 'number' ? candidate : false;
};

lib.validateStringByMinLength = (candidate, minLen=1) => {
  return (lib.validateString(candidate) &&
    candidate.trim().length >= minLen) ?
      candidate : false;
};

lib.validateStringByLength = (candidate, len) => {
  return (lib.validateString(candidate) &&
    candidate.trim().length == len) ?
      candidate : false;
};

lib.validateNumberByMinLength = (candidate, minLen=100) => {
  return (lib.validateNumber(candidate) &&
    candidate < minLen) ?
      candidate : false;
};

module.exports = lib;