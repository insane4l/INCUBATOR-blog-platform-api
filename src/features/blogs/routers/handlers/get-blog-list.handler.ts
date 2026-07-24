import { Request, Response } from 'express';
import { HTTP_STATUS } from '../../../../core/constants/http-status.constants.js';
import { mapToBlogListOutput } from '../../mappers/map-list-blog-to-output.js';
import { BlogListOutput } from '../../dto/blog.output.js';
import { db } from '../../../../db/in-memory.db.js';

export const getBlogListHandler = (req: Request, res: Response<BlogListOutput>) => {
    res.status(HTTP_STATUS.OK_200).send(mapToBlogListOutput(db.blogs));
};
