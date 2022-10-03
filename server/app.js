require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routers = require('./routes');
const auth = require('./middleware/sessionAuth.js');
const compression = require('compression');

const app = express();

app.use(compression());
app.use(express.json());
app.use(cors({origin: process.env.CL_ORIGIN}));

for (let router of Object.values(routers)) {
  app.use(router);
}

module.exports = app;
