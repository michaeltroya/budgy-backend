const express = require('express');
const router = express.Router();
const passport = require('passport');

//GET DASHBOARD INFO
router.get('/', (req, res) => {
  res.send('home');
});

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { user } = req;
  res.status(200).send({ user });
});

module.exports = router;
