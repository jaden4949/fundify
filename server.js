const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
// Always require and configure near the top
require('dotenv').config();
// Connect to the database
require('./config/database');

const app = express();
app.use(express.json());

const campaignRoutes = require('./routes/api/campaigns');

// Use routes
app.use('/api/campaigns', campaignRoutes);

app.use(logger('dev'));
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// Middleware to check and verify a JWT and
// assign the user object from the JWT to req.user
app.use(require('./config/checkToken'));

const port = process.env.PORT || 3001;

// Put API routes here, before the "catch all" route
// app.use('/api/users', require('./routes/api/users'));
app.use("/api/users", require("./routes/api/users"))

app.use("/api/campaigns", require("./routes/api/campaigns"))
// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX/API requests
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, function() {
  console.log(`Express app running on port ${port}`);
});

// Example in a Node.js/Express server-side route
app.get('/api/campaigns/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).send('Campaign not found');
    }
    res.send(campaign); // Ensure this sends back all required fields, including creatorId
  } catch (error) {
    res.status(500).send(error);
  }
});
