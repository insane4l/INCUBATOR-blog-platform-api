import express, { Express } from 'express';
import { HTTP_STATUS } from './core/constants/http-status.constants.js';
import { testingRouter } from './features/testing/testing.router.js';
import { blogsRouter } from './features/blogs/routers/blogs.router.js';
import { postsRouter } from './features/posts/routers/posts.router.js';
import { BLOGS_PATH } from './features/blogs/constants/blogs.paths.js';
import { POSTS_PATH } from './features/posts/constants/posts.paths.js';
import { TESTING_PATH } from './features/testing/constants/testing.paths.js';

export const setupApp = (app: Express) => {
    app.use(express.json());

    app.get('/', (req, res) => {
        res.status(HTTP_STATUS.OK_200).send('Blog platform api');
    });

    app.use(TESTING_PATH, testingRouter);
    app.use(BLOGS_PATH, blogsRouter);
    app.use(POSTS_PATH, postsRouter);

    return app;
};
