import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
const dotenvConfig = dotenv.config();
import routes from './routes.js';
import { createCollections } from "./mongoDbModule.js";

if (dotenvConfig.error) {
  throw dotenvConfig.error
}

const app = express();
const port = process.env.PORT || 3000;
const environment = process.env.NODE_ENV || 'development';
app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);

export let dbUrl;
if (environment === 'development') {
    dbUrl = `mongodb://${process.env.HOST}/${process.env.PORT_MONGODB}`;
    console.log('Connecting to local DB...');
} else if (environment === 'production') {
    dbUrl = `mongodb+srv://admin:${process.env.DB_PASSWORD}@cluster0.a0rtm.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
    console.log('Connecting to production DB...');
}

createCollections(dbUrl);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
