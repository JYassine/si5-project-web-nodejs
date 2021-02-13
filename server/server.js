const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenvConfig = dotenv.config()
const routes = require('./routes');
if (dotenvConfig.error) {
  throw dotenvConfig.error
}

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});