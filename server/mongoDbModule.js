import MongoClientObject from "mongodb";
import { convertCSVtoJSON } from "./utils/converter.js";
import { dbUrl } from "./server.js";

const TAUX_INC_Q_FRA = "taux-inc-q-fra";

const MongoClient = MongoClientObject.MongoClient;

export const createCollections = async () => {
  const client = new MongoClient(dbUrl, { useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db(process.env.DBNAME);
    const collection = database.collection(TAUX_INC_Q_FRA);

    try {
      await collection.drop();
    } catch (e) {
      // Osef
    }

    const toInsert = await convertCSVtoJSON();
    const result = await collection.insertMany(toInsert, { ordered: true });
    console.log(`${result.insertedCount} documents inserted`);
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

export const getIncidentRatesDailyFranceWithFilterAge = async (age) => {
  const client = new MongoClient(dbUrl, { useUnifiedTopology: true });
  let collection = [];

  try {
    await client.connect();
    const database = client.db(process.env.DBNAME);
    collection = database.collection(TAUX_INC_Q_FRA);
    let columnToExclude = ["pop", "fra", "pop_f", "pop_h"];

    const result = await findDocumentWithFilterQueryColumn(
      collection,
      "cl_age90",
      age,
      columnToExclude
    );
    return result;
  } catch (err) {
    throw new Error(err);
  } finally {
    await client.close();
  }
};

export const getIncidentRatesDailyFranceWithFilterGender = async (gender) => {
  const client = new MongoClient(dbUrl, { useUnifiedTopology: true });
  let collection = [];

  try {
    await client.connect();
    const database = client.db(process.env.DBNAME);
    collection = database.collection(TAUX_INC_Q_FRA);
    let columnToExclude = [];
    if (gender.toLowerCase() === "f") {
      columnToExclude = ["pop", "fra", "pop_f", "pop_h", "P_h", "P"];
    } else {
      columnToExclude = ["pop", "fra", "pop_f", "pop_h", "P_f", "P"];
    }
    const result = await findDocumentWithFilterQuery(
      collection,
      columnToExclude
    );
    return result;
  } catch (err) {
    throw new Error(err);
  } finally {
    await client.close();
  }
};

export const getIncidentRatesDailyFranceWithFilterMonth = async (month) => {
  const client = new MongoClient(dbUrl, { useUnifiedTopology: true });
  let collection = [];

  try {
    await client.connect();
    const database = client.db(process.env.DBNAME);
    collection = database.collection(TAUX_INC_Q_FRA);
    let columnToExclude = [];
    columnToExclude = ["pop", "fra", "pop_f", "pop_h"];
    let regexMonth = new RegExp("-" + month + "-");
    const result = await findDocumentWithFilterQueryColumn(
      collection,
      "jour",
      regexMonth,
      columnToExclude
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
  columnToExclude
) => {
  let obj = {};

  obj[nameColumn] = value;
  let projectionColumnToExclude = {};
  columnToExclude.forEach((col) => {
    projectionColumnToExclude[col] = 0;
  });
  const cursor = await collection
    .find(obj, { projection: projectionColumnToExclude })
    .toArray();
  return cursor;
};

const findDocumentWithFilterQuery = async (collection, columnToExclude) => {
  let projectionColumnToExclude = {};
  columnToExclude.forEach((col) => {
    projectionColumnToExclude[col] = 0;
  });
  const cursor = await collection
    .find({}, { projection: projectionColumnToExclude })
    .toArray();
  return cursor;
};
