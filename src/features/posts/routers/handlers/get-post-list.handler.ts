import { Request, Response } from 'express';
import { HTTP_STATUS } from '../../../../core/constants/http-status.constants.js';
import { mapToPostListOutput } from '../../mappers/map-list-post-to-output.js';
import { PostListOutput } from '../../dto/post.output.js';
import { db } from '../../../../db/in-memory.db.js';

export const getPostListHandler = (req: Request, res: Response<PostListOutput>) => {
    res.status(HTTP_STATUS.OK_200).send(mapToPostListOutput(db.posts));
};
