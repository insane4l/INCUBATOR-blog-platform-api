import { Router, Request, Response } from 'express';
import { db } from '../../db/in-memory.db.js';
import { HTTP_STATUS } from '../../core/constants/http-status.constants.js';
import { TESTING_ROUTES } from './constants/testing.paths.js';

export const testingRouter = Router({});

// Remove all data from mock db (used to clean up data before testing)
testingRouter.delete(TESTING_ROUTES.ALL_DATA, (req: Request, res: Response) => {
    db.blogs = {};
    db.posts = {};
    res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
});
