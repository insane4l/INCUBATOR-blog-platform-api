import { Request, Response } from 'express';
import { HTTP_STATUS } from '../../../../core/constants/http-status.constants.js';
import { BlogListOutput } from '../../dto/blog.output.js';
import { blogsRepository } from '../../repositories/blogs.repository.js';

export const getBlogListHandler = (req: Request, res: Response<BlogListOutput>) => {
    res.status(HTTP_STATUS.OK_200).send(blogsRepository.findAll());
};
