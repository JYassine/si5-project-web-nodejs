const express = require('express');

const publicRouter = express.Router();
const incidentRateRoute = require('./routes/incidentRate');

publicRouter.use('/incidentRates', incidentRateRoute);

module.exports = publicRouter;