import { HTTP_STATUS } from '../../../../core/constants/http-status.constants.js';
import { Request, Response } from 'express';
import { BlogCreateInput } from '../../dto/blog.input.js';
import { db } from '../../../../db/in-memory.db.js';

export const createBlogHandler = (req: Request<{}, {}, BlogCreateInput>, res: Response) => {
    const attributes = req.body;
    const id = Date.now() + Math.floor(Math.random() * 1000);

    const newBlog = {
        id,
        ...attributes, // todo: need to trim all user data with type 'string' .trim()
    };

    db.blogs[id] = attributes;

    res.status(HTTP_STATUS.CREATED_201).send(newBlog);
};
