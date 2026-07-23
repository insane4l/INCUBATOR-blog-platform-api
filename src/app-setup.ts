import express, { Express } from 'express';
import { HTTP_STATUS } from './core/constants/http-status.constants.js';
import { testingRouter } from './features/testing/testing.router.js';
import { blogsRouter } from './features/blogs/blogs.router.js';
import { postsRouter } from './features/posts/posts.router.js';

export const setupApp = (app: Express) => {
    app.use(express.json());

    app.get('/', (req, res) => {
        res.status(HTTP_STATUS.OK_200).send('Blog platform api');
    });

    app.use('/ht_02/api/testing', testingRouter);
    app.use('/ht_02/api/blogs', blogsRouter);
    app.use('/ht_02/api/posts', postsRouter);

    return app;
};
