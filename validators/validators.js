const mongoose = require('mongoose');
const isEmpty = require('is-empty');
const validator = require('validator');

exports.validateRegisterData = user => {
  const errors = {};
  if (isEmpty(user.email)) {
    errors.email = 'Email can not be empty';
  } else if (!validator.isEmail(user.email)) {
    errors.email = 'Must be a valid email';
  }
  if (isEmpty(user.password)) {
    errors.password = 'Password can not be empty';
  }
  if (user.password !== user.confirmPassword) {
    errors.password = 'Passwords must match';
  }
  if (isEmpty(user.username)) {
    errors.username = 'Username can not be empty';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

exports.validateLoginData = user => {
  const errors = {};
  if (isEmpty(user.email)) {
    errors.email = 'Email can not be empty';
  }
  if (isEmpty(user.password)) {
    errors.password = 'Password can not be empty';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
