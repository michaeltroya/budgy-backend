require('dotenv').config();

const express = require('express');
const router = express.Router();
const passport = require('passport');

const Dashboard = require('../models/Dashboard');

//GET BUDGET
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const {
    user: { username }
  } = req;

  Dashboard.findOne({ username })
    .then(dashboard => {
      return res.json(dashboard);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err.code });
    });
});

//SAVE OR UPDATE BUDGET
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const {
    user: { username }
  } = req;

  const saveDashboard = {
    username,
    createdAt: new Date().toISOString(),
    totalBudget: req.body.totalBudget,
    totalSpent: req.body.totalSpent,
    totalRemaining: req.body.totalRemaining,
    people: req.body.people
  };

  Dashboard.findOne({ username })
    .then(dashboard => {
      if (dashboard) {
        dashboard.totalBudget = saveDashboard.totalBudget;
        dashboard.totalSpent = saveDashboard.totalSpent;
        dashboard.totalRemaining = saveDashboard.totalRemaining;
        dashboard.people = saveDashboard.people;

        dashboard
          .save()
          .then(() => {
            res.status(201).json(dashboard);
          })
          .catch(err => console.log(err));
      } else {
        const newDashboard = new Dashboard({ ...saveDashboard });
        newDashboard
          .save()
          .then(doc => {
            res.status(201).json(doc);
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err.code });
    });
});

module.exports = router;
