import { Request, Response } from 'express';
import { HTTP_STATUS } from '../../../../core/constants/http-status.constants.js';
import { createNotFoundError } from '../../../../core/validation/validation-messages.js';
import { mapToPostOutput } from '../../mappers/map-post-to-output.js';
import { db } from '../../../../db/in-memory.db.js';

export const getPostHandler = (req: Request<{ id: string }>, res: Response) => {
    const postId = Number(req.params.id);
    const selectedPost = db.posts[postId];

    if (!selectedPost) {
        res.status(HTTP_STATUS.NOT_FOUND_404).send(createNotFoundError('id'));
        return;
    }

    res.status(HTTP_STATUS.OK_200).send(mapToPostOutput(postId, selectedPost));
};
