import { Request, Response } from 'express';
import { HTTP_STATUS } from '../../../../core/constants/http-status.constants.js';
import { createNotFoundError } from '../../../../core/validation/validation-messages.js';
import { mapToBlogOutput } from '../../mappers/map-blog-to-output.js';
import { db } from '../../../../db/in-memory.db.js';

export const getBlogHandler = (req: Request<{ id: string }>, res: Response) => {
    const blogId = Number(req.params.id);
    const selectedBlog = db.blogs[blogId];

    if (!selectedBlog) {
        res.status(HTTP_STATUS.NOT_FOUND_404).send(createNotFoundError('id'));
        return;
    }

    res.status(HTTP_STATUS.OK_200).send(mapToBlogOutput(blogId, selectedBlog));
};
