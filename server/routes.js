import express from 'express';

const publicRouter = express.Router();
import incidentRateRoute from './routes/incidentRate.js'

publicRouter.use('/incidentRates', incidentRateRoute);

// module.exports = publicRouter;
export default publicRouter;
