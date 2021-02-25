import express from "express";
import { query } from "express-validator";
import {
  getIncidentRatesDailyFrance,
  getIncidentRatesDailyFranceWithFilterAge,
  getIncidentRatesDailyFranceWithFilterGender,
  getIncidentRatesDailyFranceWithFilterMonth,
  getIncidentRatesDailyRegion,
  getMonthsForYear,
} from "../mongoDbModule.js";

const incidentRateRouter = express.Router();
const DELIMITER = "-";

/**
 * Get all incident rates
 * can be filtered by gender, month and age
 */
incidentRateRouter.get("/", async (req, res) => {
  try {
    let queryAge = undefined;
    let queryGender = undefined;
    let queryMonth = undefined;
    let queryRegion = undefined;
    let queryYear = req.query.year ? req.query.year : "";

    if (req.query) {
      if (req.query.age) {
        queryAge = await getIncidentRatesDailyFranceWithFilterAge(
          req.query.age,
          req.query.region
        );
        queryAge = queryAge.filter((value) => {
          return value.jour.match(queryYear + DELIMITER);
        });
      }
      if (req.query.gender) {
        queryGender = await getIncidentRatesDailyFranceWithFilterGender(
          req.query.gender,
          req.query.region
        );
        queryGender = queryGender.filter((value) => {
          return value.jour.match(queryYear + DELIMITER);
        });
      }
      if (req.query.month) {
        queryMonth = await getIncidentRatesDailyFranceWithFilterMonth(
          req.query.month,
          req.query.region
        );
        queryMonth = queryMonth.filter((value) => {
          return value.jour.match(queryYear + DELIMITER);
        });
      }
      if (req.query.region) {
        queryRegion = await getIncidentRatesDailyRegion(req.query.region);
        queryRegion = queryRegion.filter((value) => {
          return value.jour.match(queryYear + DELIMITER);
        });
      }
    }
    let finalResult = [];
    if (
      queryAge !== undefined &&
      queryGender !== undefined &&
      queryMonth !== undefined
    ) {
      finalResult = queryGender.filter((value) => {
        return (
          value.cl_age90 === req.query.age &&
          value.jour.match(DELIMITER + req.query.month + DELIMITER)
        );
      });
      return res.status(200).json(finalResult);
    } else if (
      queryAge !== undefined &&
      queryGender !== undefined &&
      queryMonth === undefined
    ) {
      finalResult = queryGender.filter(
        (value) => value.cl_age90 === req.query.age
      );
      return res.status(200).json(finalResult);
    } else if (
      queryAge !== undefined &&
      queryGender === undefined &&
      queryMonth !== undefined
    ) {
      finalResult = queryMonth.filter(
        (value) => value.cl_age90 === req.query.age
      );
      return res.status(200).json(finalResult);
    } else if (
      queryAge === undefined &&
      queryGender !== undefined &&
      queryMonth !== undefined
    ) {
      finalResult = queryGender.filter((value) =>
        value.jour.match(DELIMITER + req.query.month + DELIMITER)
      );
      return res.status(200).json(finalResult);
    } else if (queryAge !== undefined) {
      return res.status(200).json(queryAge);
    } else if (queryGender !== undefined) {
      return res.status(200).json(queryGender);
    } else if (queryMonth !== undefined) {
      return res.status(200).json(queryMonth);
    } else if (queryRegion !== undefined) {
      return res.status(200).json(queryRegion);
    }
    const results = await getIncidentRatesDailyFrance();
    return res.status(200).json(results);
  } catch (err) {
    return res.status(400).json(err.message);
  }
});

/**
 * Get all months of a specific year
 *
 */
incidentRateRouter.get("/months/:year", async (req, res) => {
  try {
    const results = await getMonthsForYear(req.params.year);
    return res.status(200).json(results);
  } catch (err) {
    return res.status(400).json(err.message);
  }
});

export default incidentRateRouter;
