import express from 'express';
import config from 'config';
import errorHandler from './startup/error.js';
import routes from './startup/routes.js';
import cron from 'node-cron';
import connection from './startup/db.js';
import { mailHandler } from './helper/mail.js';

const app = express();

routes(app);
errorHandler();

cron.schedule("0 1 * * *", function () {
    connection.query("SELECT * FROM user",
        ((err, data) => {
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    const el = data[i];
                    connection.query(
                        `SELECT * FROM memory WHERE user_id = ${el.id} AND reminded_at_utc IS NULL ORDER BY created_at_utc LIMIT 1`,
                        (async (err, data) => {
                            if (data.length > 0) {
                                await mailHandler(el?.email, data[0]?.title, data[0]?.description);
                            }
                        })
                    );
                }
            }
        }));
});


const port = process.env.PORT || config.get("port");
app.listen(port, () => console.log(`connnected on port ${port}`));