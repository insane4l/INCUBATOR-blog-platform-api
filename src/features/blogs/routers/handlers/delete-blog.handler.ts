import { Request, Response } from 'express';
import { HTTP_STATUS } from '../../../../core/constants/http-status.constants.js';
import { createNotFoundError } from '../../../../core/validation/validation-messages.js';
import { blogsRepository } from '../../repositories/blogs.repository.js';

export const deleteBlogHandler = (req: Request<{ id: string }>, res: Response) => {
    const blogId = req.params.id;
    const isBlogDeleted = blogsRepository.delete(blogId);

    if (!isBlogDeleted) {
        res.status(HTTP_STATUS.NOT_FOUND_404).send(createNotFoundError('id'));
        return;
    }

    res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
};
