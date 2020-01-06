require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('../config/passport');
const User = require('../models/User');
const validators = require('../validators/validators');

//REGISTER USER
router.post('/register', (req, res) => {
  const newUser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword
  };

  const { errors, isValid } = validators.validateRegisterData(newUser);

  if (!isValid) {
    res.status(404).json(errors);
  }

  User.findOne(newUser.username).then(user => {
    if (user) {
      res.status(404).json({ username: 'Username already in use' });
    } else {
      const userCredentials = new User({ username: req.body.username, email: req.body.email, password: req.body.password });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(userCredentials.password, salt, (err, hash) => {
          if (err) throw err;
          userCredentials.password = hash;
          userCredentials
            .save()
            .then(user => {
              res.json(user);
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

module.exports = router;
