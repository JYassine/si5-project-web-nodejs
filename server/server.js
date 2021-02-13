import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
const dotenvConfig = dotenv.config()
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

let url;
if (environment === 'development') {
    url = `mongodb://${process.env.HOST}/${process.env.PORT_MONGODB}`;
    console.log(url);
}

createCollections(url);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
