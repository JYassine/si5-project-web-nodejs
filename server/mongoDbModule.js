import MongoClientObject from 'mongodb';
import { convertCSVtoJSON } from "./utils/converter.js";
import { dbUrl } from "./server.js";

const TAUX_INC_Q_FRA = 'taux-inc-q-fra';

const MongoClient = MongoClientObject.MongoClient;

export const createCollections = async () => {
    const client = new MongoClient(dbUrl, {useUnifiedTopology: true});

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
        const result = await collection.insertMany(toInsert, {ordered: true});
        console.log(`${result.insertedCount} documents inserted`);
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
};

export const getIncidentRatesDailyFrance = async () => {
    const client = new MongoClient(dbUrl, {useUnifiedTopology: true});

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
