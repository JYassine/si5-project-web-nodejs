import MongoClientObject from "mongodb";
import { convertCSVtoJSON } from "./utils/converter.js";
import { dbUrl } from "./server.js";
import { calculateAverage } from './utils/calculateAverage.js';

const TAUX_INC_Q_FRA = "taux-inc-q-fra";
const TAUX_INC_Q_REG = "taux-inc-q-reg";

const MongoClient = MongoClientObject.MongoClient;

export const createCollections = async () => {
  const client = new MongoClient(dbUrl, { useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db(process.env.DBNAME);

    // Fill taux-inc-q-fra collection
    let collection = database.collection(TAUX_INC_Q_FRA);

    try {
      await collection.drop();
    } catch (e) {
      // Osef
    }

    let toInsert = await convertCSVtoJSON("fra");
    let result = await collection.insertMany(toInsert, { ordered: true });
    console.log(`${result.insertedCount} documents inserted in taux-inc-q-fra`);

    // Fill taux-inc-q-reg collection
    collection = database.collection(TAUX_INC_Q_REG);

    try {
      await collection.drop();
    } catch (e) {
      // Osef
    }

    toInsert = await convertCSVtoJSON("reg");
    result = await collection.insertMany(toInsert, { ordered: true });
    console.log(`${result.insertedCount} documents inserted in taux-inc-q-reg`);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};

export const getIncidentRatesDailyFrance = async () => {
  const client = new MongoClient(dbUrl, { useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db(process.env.DBNAME);
    const collection = database.collection(TAUX_INC_Q_FRA);

    return await collection.find().toArray();
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};

export const getIncidentRatesDailyFranceWithFilterAge = async (age, region) => {
  const dbToSearch = region ? TAUX_INC_Q_REG : TAUX_INC_Q_FRA;
  const client = new MongoClient(dbUrl, { useUnifiedTopology: true });
  let collection = [];

  try {
    await client.connect();
    const database = client.db(process.env.DBNAME);
    collection = database.collection(dbToSearch);
    let columnToExclude = ["pop", "fra", "pop_f", "pop_h"];

    const result = await findDocumentWithFilterQueryColumn(
      collection,
      "cl_age90",
      age,
      columnToExclude,
      region
    );
    return result;
  } catch (err) {
    throw new Error(err);
  } finally {
    await client.close();
  }
};

export const getIncidentRatesDailyFranceWithFilterGender = async (
  gender,
  region
) => {
  const dbToSearch = region ? TAUX_INC_Q_REG : TAUX_INC_Q_FRA;
  const client = new MongoClient(dbUrl, { useUnifiedTopology: true });
  let collection = [];

  try {
    await client.connect();
    const database = client.db(process.env.DBNAME);
    collection = database.collection(dbToSearch);
    let columnToExclude = [];
    if (gender.toLowerCase() === "f") {
      columnToExclude = ["pop", "fra", "pop_f", "pop_h", "P_h", "P"];
    } else {
      columnToExclude = ["pop", "fra", "pop_f", "pop_h", "P_f", "P"];
    }
    const result = await findDocumentWithFilterQuery(
      collection,
      columnToExclude,
      region
    );
    return result;
  } catch (err) {
    throw new Error(err);
  } finally {
    await client.close();
  }
};

export const getIncidentRatesDailyFranceWithFilterMonth = async (
  month,
  region,
  average
) => {
  const dbToSearch = (region || average) ? TAUX_INC_Q_REG : TAUX_INC_Q_FRA;
  const client = new MongoClient(dbUrl, { useUnifiedTopology: true });
  let collection = [];

  try {
    await client.connect();
    const database = client.db(process.env.DBNAME);
    collection = database.collection(dbToSearch);
    let columnToExclude = [];
    columnToExclude = ["pop", "fra", "pop_f", "pop_h"];
    let regexMonth = new RegExp("-" + month + "-");
    const result = await findDocumentWithFilterQueryColumn(
      collection,
      "jour",
      regexMonth,
      columnToExclude,
      region,
      average
    );
    return result;
  } catch (err) {
    throw new Error(err);
  } finally {
    await client.close();
  }
};

const findDocumentWithFilterQueryColumn = async (
  collection,
  nameColumn,
  value,
  columnToExclude,
  region,
  average
) => {
  let obj = {};

  obj[nameColumn] = value;
  let projectionColumnToExclude = {};
  columnToExclude.forEach((col) => {
    projectionColumnToExclude[col] = 0;
  });
  let cursor;
  if (region && !average) {
    obj.reg = region;
    cursor = await collection
      .find(obj, { projection: projectionColumnToExclude })
      .toArray();
  } else if (!region && !average){
    cursor = await collection
      .find(obj, { projection: projectionColumnToExclude })
      .toArray();
  } else if (!region && average){
    cursor = await collection
      .find(obj, { projection: projectionColumnToExclude })
      .sort({reg: 1})
      .toArray();
  }
  return cursor;
};

const findDocumentWithFilterQuery = async (
  collection,
  columnToExclude,
  region
) => {
  let projectionColumnToExclude = {};
  columnToExclude.forEach((col) => {
    projectionColumnToExclude[col] = 0;
  });

  let cursor;
  if (region) {
    cursor = await collection
      .find({ reg: region }, { projection: projectionColumnToExclude })
      .toArray();
  } else {
    cursor = await collection
      .find({}, { projection: projectionColumnToExclude })
      .toArray();
  }
  return cursor;
};

export const getIncidentRatesDailyRegion = async (region, average) => {
  const client = new MongoClient(dbUrl, { useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db(process.env.DBNAME);
    const collection = database.collection(TAUX_INC_Q_REG);
    let result = await collection.find({ reg: region }).toArray();
    if (average) {
      return //TODO
    } else {
      return result
    }
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};

export const getMonthsForYear = async (year) => {
  const client = new MongoClient(dbUrl, { useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db(process.env.DBNAME);
    const collection = database.collection(TAUX_INC_Q_REG);

    let regexYear = new RegExp(year + "-");
    const months = await findDocumentWithFilterQueryColumn(
      collection,
      "jour",
      regexYear,
      [
        "pop",
        "fra",
        "pop_f",
        "pop_h",
        "P_h",
        "P_f",
        "P",
        "reg",
        "cl_age90",
        "_id",
      ]
    );
    let allMonths = new Set();
    months.forEach((month) => {
      allMonths.add(month.jour.split("-")[1]);
    });
    return Array.from(allMonths);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};

export const getAllRegions = async () => {
  const client = new MongoClient(dbUrl, { useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db(process.env.DBNAME);
    const collection = database.collection(TAUX_INC_Q_REG);

    const regionsData = await findDocumentWithFilterQuery(collection, [
      "pop",
      "fra",
      "pop_f",
      "pop_h",
      "P_h",
      "P_f",
      "P",
      "cl_age90",
      "_id",
    ]);
    let allRegions = new Set();
    regionsData.forEach((region) => {
      allRegions.add(region.reg);
    });
    return Array.from(allRegions);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};
