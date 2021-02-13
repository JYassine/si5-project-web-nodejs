import express from 'express';
import {getIncidentRatesDailyFrance} from "../mongoDbModule.js";

const incidentRateRouter = express.Router();

/**
 * Get all incident rates
 * can be filtered by gender, date and age
 */
incidentRateRouter.get('/', async (req, res) => {
    try {
        const results = await getIncidentRatesDailyFrance();
        return res.status(200).send(results);
    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }


});

export default incidentRateRouter;
