import cors from 'cors';
import { json } from 'express';
import helmet from 'helmet';
import { errorHandler } from '../middleware/error.js';
import router from '../controllers/routes.js';

export default (app) => {
    app.use(helmet());
    app.use(json());
    app.use(cors());
    app.use('/', router);
    app.use((req, res) => {
        res.status(404).json({ message: "URL not found." }); 
    })

    app.use(errorHandler);
};