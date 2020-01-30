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
    errors.totalBudget = 'Total budget can not be empty';
  } else if (isNaN(dashboard.totalBudget)) {
    errors.totalBudget = 'Invalid Budget';
  }

  for (let i = 0; i < dashboard.people.length; i++) {
    if (isEmpty(dashboard.people[i].name)) {
      errors.peopleName = 'Name can not be empty';
    }

    if (isEmpty(dashboard.people[i].budget)) {
      errors.peopleBudget = 'Budget can not be empty';
    } else if (isNaN(dashboard.people[i].budget)) {
      errors.peopleBudget = 'Invalid price';
    }
  }

  for (let i = 0; i < dashboard.people.length; i++) {
    let items = dashboard.people[i].items;
    for (let j = 0; j < items.length; j++) {
      if (isEmpty(items[j].itemName)) {
        errors.itemName = 'Item name can not be empty';
      }

      if (isEmpty(items[j].itemCost)) {
        errors.itemCost = 'Item price can not be empty';
      } else if (isNaN(items[j].itemCost)) {
        errors.itemCost = 'Invalid price';
      }
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
