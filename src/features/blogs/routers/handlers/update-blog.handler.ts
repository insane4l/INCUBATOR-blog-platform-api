import { Request, Response } from 'express';
import { HTTP_STATUS } from '../../../../core/constants/http-status.constants.js';
import { createNotFoundError } from '../../../../core/validation/validation-messages.js';
import { BlogUpdateInput } from '../../dto/blog.input.js';
import { blogsRepository } from '../../repositories/blogs.repository.js';

export const updateBlogHandler = (req: Request<{ id: string }, {}, BlogUpdateInput>, res: Response) => {
    const blogId = Number(req.params.id);

    const isBlogUpdated = blogsRepository.update(blogId, req.body);

    if (!isBlogUpdated) {
        res.status(HTTP_STATUS.NOT_FOUND_404).send(createNotFoundError('id'));
        return;
    }

    res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
};
