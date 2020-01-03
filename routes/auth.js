const express = require('express');
const router = express.Router();

//LOGIN USER
router.get('/login', (req, res) => {
  res.send('Login Page');
});

//REGISTER USER
router.post('/register', (req, res) => {
  res.send('Register');
});

module.exports = router;
