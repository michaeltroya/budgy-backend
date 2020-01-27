require('dotenv').config();

const express = require('express');
const router = express.Router();
const passport = require('passport');

const Dashboard = require('../models/Dashboard');

//GET DASHBOARD
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { user } = req;

  Dashboard.findOne({ username: user }, '-_id -__v -people._id -people.items._id')
    .then(dashboard => {
      res.status(201).json(dashboard);
    })
    .catch(err => res.status(500).json({ error: err.code }));
});

//SAVE DASHBOARD
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { user } = req;

  const saveDashboard = {
    username: user,
    totalBudget: req.body.totalBudget,
    people: req.body.people
  };

  Dashboard.findOne({ username: user })
    .then(dashboard => {
      dashboard.totalBudget = saveDashboard.totalBudget;
      dashboard.people = saveDashboard.people;
      dashboard
        .save()
        .then(doc => res.status(201).json(doc))
        .catch(err => console.log(err));
    })
    .catch(err => res.status(500).json({ error: err.code }));
});

module.exports = router;
