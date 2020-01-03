const express = require('express');
const router = express.Router();

//GET DASHBOARD INFO
router.get('/', (req, res) => {
  res.send('home');
});

module.exports = router;
