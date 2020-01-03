const express = require('express');
const app = express();
const mongoose = require('mongoose');

//DB
const db = require('./config/keys').MongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//ROUTES IMPORTS
const dashboardRoutes = require('./routes/dashboard');
const authRoutes = require('./routes/auth');

//ROUTES MIDDLEWARE
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
