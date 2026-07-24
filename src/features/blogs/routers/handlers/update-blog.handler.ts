import { Request, Response } from 'express';
import { HTTP_STATUS } from '../../../../core/constants/http-status.constants.js';
import { createNotFoundError } from '../../../../core/validation/validation-messages.js';
import { BlogUpdateInput } from '../../dto/blog.input.js';
import { db } from '../../../../db/in-memory.db.js';

export const updateBlogHandler = (req: Request<{ id: string }, {}, BlogUpdateInput>, res: Response) => {
    const blogId = Number(req.params.id);
    const selectedBlog = db.blogs[blogId];

    if (!selectedBlog) {
        res.status(HTTP_STATUS.NOT_FOUND_404).send(createNotFoundError('id'));
        return;
    }

    db.blogs[blogId] = req.body;
    res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
};
