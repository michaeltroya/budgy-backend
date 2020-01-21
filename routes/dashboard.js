require('dotenv').config();

const express = require('express');
const router = express.Router();
const passport = require('passport');

const Dashboard = require('../models/Dashboard');

//GET BUDGET
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { user } = req;

  Dashboard.findOne({ username: user })
    .then(dashboard => {
      res.status(201).json(dashboard);
    })
    .catch(err => res.status(500).json({ error: err.code }));
});

//SAVE BUDGET
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { user } = req;

  const saveDashboard = {
    username: user,
    totalBudget: req.body.totalBudget,
    totalSpent: req.body.totalSpent,
    totalRemaining: req.body.totalRemaining,
    people: req.body.people
  };

  Dashboard.findOne({ username: user })
    .then(dashboard => {
      dashboard.totalBudget = saveDashboard.totalBudget;
      dashboard.totalSpent = saveDashboard.totalSpent;
      dashboard.totalRemaining = saveDashboard.totalRemaining;
      dashboard.people = saveDashboard.people;
      dashboard
        .save()
        .then(doc => res.status(201).json(doc))
        .catch(err => console.log(err));
    })
    .catch(err => res.status(500).json({ error: err.code }));
});

module.exports = router;
