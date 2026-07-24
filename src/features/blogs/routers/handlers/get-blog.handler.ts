import { Request, Response } from 'express';
import { HTTP_STATUS } from '../../../../core/constants/http-status.constants.js';
import { createNotFoundError } from '../../../../core/validation/validation-messages.js';
import { blogsRepository } from '../../repositories/blogs.repository.js';

export const getBlogHandler = (req: Request<{ id: string }>, res: Response) => {
    const blogId = Number(req.params.id);
    const selectedBlog = blogsRepository.findById(blogId);

    if (!selectedBlog) {
        res.status(HTTP_STATUS.NOT_FOUND_404).send(createNotFoundError('id'));
        return;
    }

    res.status(HTTP_STATUS.OK_200).send(selectedBlog);
};
