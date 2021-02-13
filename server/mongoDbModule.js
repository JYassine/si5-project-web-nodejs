import MongoClientObject from 'mongodb';
import {convertCSVtoJSON} from "./utils/converter.js";
const MongoClient = MongoClientObject.MongoClient;

export const createCollections = async (url) => {
    const client = new MongoClient(url, {useUnifiedTopology: true});

    try {
        await client.connect();
        const database = client.db(process.env.DBNAME);
        const collection = database.collection('taux-inc-q-fra');

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
    const client = new MongoClient(url, {useUnifiedTopology: true});

    try {
        await client.connect();
        const database = client.db(process.env.DBNAME);
        const collection = database.collection('taux-inc-q-fra');

        return await collection.find({});
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
};
