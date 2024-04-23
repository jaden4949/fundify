const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

require('dotenv').config();
require('./config/database');

const app = express();
app.use(express.json());

const campaignRoutes = require('./routes/api/campaigns');

app.use('/api/campaigns', campaignRoutes);
app.use(logger('dev'));
app.use(express.json());

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.use(require('./config/checkToken'));

const port = process.env.PORT || 3001;

app.use("/api/users", require("./routes/api/users"))

app.use("/api/campaigns", require("./routes/api/campaigns"))

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, function() {
  console.log(`Express app running on port ${port}`);
});


app.get('/api/campaigns/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).send('Campaign not found');
    }
    res.send(campaign);
  } catch (error) {
    res.status(500).send(error);
  }
});
