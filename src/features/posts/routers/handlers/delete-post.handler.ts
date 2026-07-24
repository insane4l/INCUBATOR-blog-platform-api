import { Request, Response } from 'express';
import { HTTP_STATUS } from '../../../../core/constants/http-status.constants.js';
import { createNotFoundError } from '../../../../core/validation/validation-messages.js';
import { postsRepository } from '../../repositories/posts.repository.js';

export const deletePostHandler = (req: Request<{ id: string }>, res: Response) => {
    const postId = Number(req.params.id);

    const isPostDeleted = postsRepository.delete(postId);

    if (!isPostDeleted) {
        res.status(HTTP_STATUS.NOT_FOUND_404).send(createNotFoundError('id'));
        return;
    }

    res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
};
