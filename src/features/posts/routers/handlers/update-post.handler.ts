import { Request, Response } from 'express';
import { HTTP_STATUS } from '../../../../core/constants/http-status.constants.js';
import { createNotFoundError } from '../../../../core/validation/validation-messages.js';
import { PostUpdateInput } from '../../dto/post.input.js';
import { blogsRepository } from '../../../blogs/repositories/blogs.repository.js';
import { postsRepository } from '../../repositories/posts.repository.js';

export const updatePostHandler = (req: Request<{ id: string }, {}, PostUpdateInput>, res: Response) => {
    const isExistingBlogId = blogsRepository.findById(req.body.blogId);

    if (!isExistingBlogId) {
        res.status(HTTP_STATUS.NOT_FOUND_404).send(createNotFoundError('blogId'));
        return;
    }

    const postId = Number(req.params.id);
    const isPostUpdated = postsRepository.update(postId, req.body);

    if (!isPostUpdated) {
        res.status(HTTP_STATUS.NOT_FOUND_404).send(createNotFoundError('id'));
        return;
    }

    res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
};
