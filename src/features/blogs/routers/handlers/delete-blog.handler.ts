import { Request, Response } from 'express';
import { HTTP_STATUS } from '../../../../core/constants/http-status.constants.js';
import { createNotFoundError } from '../../../../core/validation/validation-messages.js';
import { db } from '../../../../db/in-memory.db.js';

export const deleteBlogHandler = (req: Request<{ id: string }>, res: Response) => {
    const blogId = Number(req.params.id);
    const selectedBlog = db.blogs[blogId];

    if (!selectedBlog) {
        res.status(HTTP_STATUS.NOT_FOUND_404).send(createNotFoundError('id'));
        return;
    }

    delete db.blogs[blogId];
    res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
};
