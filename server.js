require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');

require('./config/passport')(passport);

//ROUTES IMPORTS
const dashboardRoutes = require('./routes/dashboard');
const authRoutes = require('./routes/auth');

//MIDDLEWARE
const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

//ROUTES MIDDLEWARE
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/auth', authRoutes);

//DB
mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
