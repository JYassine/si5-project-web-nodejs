import express from 'express';
const incidentRateRouter = express.Router();

/**
 * Get all incident rates
 * can be filtered by gender, date and age
 */
incidentRateRouter.get('/'
    , (req, res, next) => {

        return res.status(200).json("Incident Rate endpoint")
    });

export default incidentRateRouter;
