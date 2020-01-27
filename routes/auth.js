require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Dashboard = require('../models/Dashboard');
const validators = require('../validators/validators');

//REGISTER USER
router.post('/register', (req, res) => {
  const newUser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword
  };

  const saveNewDashboard = {
    username: req.body.username,
    totalBudget: 0,
    people: []
  };

  const { errors, isValid } = validators.validateRegisterData(newUser);

  if (!isValid) {
    res.status(400).json(errors);
  }

  User.findOne({ username: newUser.username }).then(user => {
    if (user) {
      return res.status(400).json({ username: 'Username already in use' });
    } else {
      User.findOne({ email: newUser.email }).then(user => {
        if (user) {
          return res.status(400).json({ email: 'Email already in use' });
        } else {
          const userCredentials = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
          });
          bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              console.log(err);
            }
            bcrypt.hash(userCredentials.password, salt, (err, hash) => {
              if (err) {
                console.log(err);
              }
              userCredentials.password = hash;
              userCredentials
                .save()
                .then(user => {
                  const payload = {
                    id: user.id,
                    username: user.username
                  };
                  jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 10000 }, (err, token) => {
                    if (err) {
                      console.log(err);
                    } else {
                      const newDashboard = new Dashboard({ ...saveNewDashboard });
                      newDashboard
                        .save()
                        .then(() => res.status(201).json({ token: `${token}` }))
                        .catch(err => console.log(err));
                    }
                  });
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
  });
});

//LOGIN USER
router.post('/login', (req, res) => {
  const userDetails = {
    email: req.body.email,
    password: req.body.password
  };

  const { errors, isValid } = validators.validateLoginData(userDetails);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: userDetails.email }).then(user => {
    if (!user) {
      return res.status(403).json({ general: 'Incorrect email or password, please try again.' });
    }
    bcrypt.compare(userDetails.password, user.password).then(isMatch => {
      if (!isMatch) {
        return res.status(403).json({ general: 'Incorrect email or password, please try again.' });
      } else {
        const payload = {
          id: user.id,
          username: user.username
        };
        jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 10000 }, (err, token) => {
          if (err) {
            console.log(err);
          }
          return res.status(201).json({ username: user.username, token: `${token}` });
        });
      }
    });
  });
});

module.exports = router;
