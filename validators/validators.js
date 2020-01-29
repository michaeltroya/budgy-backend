const isEmpty = require('is-empty');
const validator = require('validator');

exports.validateRegisterData = user => {
  const errors = {};
  const regex = /^[A-Za-z0-9 ]+$/;
  const usernameTest = regex.test(user.username);

  if (isEmpty(user.email)) {
    errors.email = 'Email can not be empty';
  } else if (!validator.isEmail(user.email)) {
    errors.email = 'Must be a valid email';
  }

  if (isEmpty(user.password)) {
    errors.password = 'Password can not be empty';
  } else if (user.password.length < 6) {
    errors.password = 'Password must be a minimum of 6 characters';
  }

  if (user.password !== user.confirmPassword) {
    errors.password = 'Passwords must match';
  }

  if (isEmpty(user.username)) {
    errors.username = 'Username can not be empty';
  } else if (user.username.length < 4) {
    errors.username = 'Username must a minimum of 4 characters';
  } else if (!usernameTest) {
    errors.username = 'Username can only have letters and numbers';
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

exports.validateDashboardData = dashboard => {
  const errors = {};

  if (isEmpty(dashboard.totalBudget)) {
    errors.dashboard = 'Total budget can not be empty';
  } else if (isNaN(dashboard.totalBudget)) {
    errors.dashboard = 'Invalid format';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
