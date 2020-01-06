const mongoose = require('mongoose');
const isEmpty = require('is-empty');
const validator = require('validator');

exports.validateRegisterData = data => {
  const errors = {};

  if (isEmpty(data.email)) {
    errors.email = 'Email can not be empty';
  } else if (!validator.isEmail(data.email)) {
    errors.email = 'Must be a valid email';
  }
  if (isEmpty(data.password)) {
    errors.password = 'Password can not be empty';
  }

  if (data.password !== data.confirmPassword) {
    errors.password = 'Passwords must match';
  }

  if (isEmpty(data.handle)) {
    errors.handle = 'Handle can not be empty';
  }

  if (isEmpty(data.username)) {
    errors.username = 'Username can not be empty';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

exports.validateLoginData = data => {
  const errors = {};

  if (isEmpty(data.email)) {
    errors.email = 'Email can not be empty';
  }
  if (isEmpty(data.password)) {
    errors.password = 'Password can not be empty';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
