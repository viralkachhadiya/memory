import express from 'express';
import config from 'config';
import errorHandler from './startup/error.js';
import routes from './startup/routes.js';
import cron from 'node-cron';

const app = express();

routes(app);
errorHandler();

cron.schedule("*/1 * * * *", function () {
    console.log('Hello');
});


const port = process.env.PORT || config.get("port");
app.listen(port, () => console.log(`connnected on port ${port}`));