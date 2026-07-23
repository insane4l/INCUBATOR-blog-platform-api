import express, { Express } from 'express';
import { HTTP_STATUS } from './core/constants/http-status.constants.js';

export const setupApp = (app: Express) => {
    app.use(express.json());

    app.get('/', (req, res) => {
        res.status(HTTP_STATUS.OK_200).send('Blog platform api');
    });

    // app.use('/ht_02/api/testing', testingRouter);

    return app;
};
