import { HTTP_STATUS } from '../../../../core/constants/http-status.constants.js';
import { Request, Response } from 'express';
import { BlogCreateInput } from '../../dto/blog.input.js';
import { blogsRepository } from '../../repositories/blogs.repository.js';

export const createBlogHandler = (req: Request<{}, {}, BlogCreateInput>, res: Response) => {
    const newBlog = blogsRepository.create(req.body);
    res.status(HTTP_STATUS.CREATED_201).send(newBlog);
};
