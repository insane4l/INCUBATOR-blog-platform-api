import { Request, Response } from 'express';
import { HTTP_STATUS } from '../../../../core/constants/http-status.constants.js';
import { PostListOutput } from '../../dto/post.output.js';
import { postsRepository } from '../../repositories/posts.repository.js';

export const getPostListHandler = (req: Request, res: Response<PostListOutput>) => {
    res.status(HTTP_STATUS.OK_200).send(postsRepository.findAll());
};
