const express = require('express');
const incidentRateRouter = express.Router();
var connectionMongoDb = require('../mongoDbModule.js');

/**
 * Get all incident rates
 * can be filtered by gender, date and age
 */
incidentRateRouter.get('/'
    , (req, res, next) => {

        return res.status(200).json("Incident Rate endpoint")
    });
module.exports = incidentRateRouter;
