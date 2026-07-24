import { Request, Response } from 'express';
import { HTTP_STATUS } from '../../../../core/constants/http-status.constants.js';
import { createNotFoundError } from '../../../../core/validation/validation-messages.js';
import { PostUpdateInput } from '../../dto/post.input.js';
import { db } from '../../../../db/in-memory.db.js';

export const updatePostHandler = (req: Request<{ id: string }, {}, PostUpdateInput>, res: Response) => {
    const postId = Number(req.params.id);
    const selectedPost = db.posts[postId];

    if (!selectedPost) {
        res.status(HTTP_STATUS.NOT_FOUND_404).send(createNotFoundError('id'));
        return;
    }

    const attributes = req.body;
    if (!db.blogs[attributes.blogId]) {
        res.status(HTTP_STATUS.NOT_FOUND_404).send(createNotFoundError('blogId'));
        return;
    }

    db.posts[postId] = attributes;
    res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
};
