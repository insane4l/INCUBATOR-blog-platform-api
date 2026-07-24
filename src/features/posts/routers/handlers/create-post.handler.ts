import { Request, Response } from 'express';
import { PostCreateInput } from '../../dto/post.input.js';
import { db } from '../../../../db/in-memory.db.js';
import { HTTP_STATUS } from '../../../../core/constants/http-status.constants.js';
import { createNotFoundError } from '../../../../core/validation/validation-messages.js';

export const createPostHandler = (req: Request<{}, {}, PostCreateInput>, res: Response) => {
    const attributes = req.body;

    if (!db.blogs[attributes.blogId]) {
        res.status(HTTP_STATUS.NOT_FOUND_404).send(createNotFoundError('blogId'));
        return;
    }

    const id = Date.now() + Math.floor(Math.random() * 1000);

    const newPost = {
        id,
        ...attributes, // todo: need to trim all user data with type 'string' .trim()
    };

    db.posts[id] = attributes;

    res.status(HTTP_STATUS.CREATED_201).send(newPost);
};
