import { Router, Request, Response } from 'express';
import { HTTP_STATUS } from '../../core/constants/http-status.constants.js';
import { PostListOutput } from './dto/post.output.js';
import { db } from '../../db/in-memory.db.js';
import { createNotFoundError } from '../../core/validation/validation-messages.js';
import { mapToPostListOutput } from './mappers/map-list-post-to-output.js';
import { mapToPostOutput } from './mappers/map-post-to-output.js';
import { PostCreateInput, PostUpdateInput } from './dto/post.input.js';
import { paramIdValidation } from '../../core/middlewares/params-id-validation.middleware.js';
import { postCreateValidation, postUpdateValidation } from './validation/post.validation.js';
import { inputValidationResultMiddleware } from '../../core/middlewares/input-validation-result.middleware.js';

export const postsRouter = Router({});

postsRouter
    .get('', (req: Request, res: Response<PostListOutput>) => {
        res.status(HTTP_STATUS.OK_200).send(mapToPostListOutput(db.posts));
    })

    .get('/:id', paramIdValidation, inputValidationResultMiddleware, (req: Request<{ id: string }>, res: Response) => {
        const postId = Number(req.params.id);
        const selectedPost = db.posts[postId];

        if (!selectedPost) {
            res.status(HTTP_STATUS.NOT_FOUND_404).send(createNotFoundError('id'));
            return;
        }

        res.status(HTTP_STATUS.OK_200).send(mapToPostOutput(postId, selectedPost));
    })

    .post('', postCreateValidation, inputValidationResultMiddleware, (req: Request<{}, {}, PostCreateInput>, res: Response) => {
        const attributes = req.body;

        if (!db.blogs[attributes.blogId]) {
            res.status(HTTP_STATUS.NOT_FOUND_404).send(createNotFoundError('blogId'));
            return;
        }

        const id = Date.now() + Math.floor(Math.random() * 1000);

        const newPost = {
            id,
            ...attributes, // todo: need to trim all user data with type 'string' .trim()
        };

        db.posts[id] = attributes;

        res.status(HTTP_STATUS.CREATED_201).send(newPost);
    })

    .put(
        '/:id',
        paramIdValidation,
        postUpdateValidation,
        inputValidationResultMiddleware,
        (req: Request<{ id: string }, {}, PostUpdateInput>, res: Response) => {
            const postId = Number(req.params.id);
            const selectedPost = db.posts[postId];

            if (!selectedPost) {
                res.status(HTTP_STATUS.NOT_FOUND_404).send(createNotFoundError('id'));
                return;
            }

            const attributes = req.body;
            if (!db.blogs[attributes.blogId]) {
                res.status(HTTP_STATUS.NOT_FOUND_404).send(createNotFoundError('blogId'));
                return;
            }

            db.posts[postId] = attributes;
            res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
        },
    )

    .delete('/:id', paramIdValidation, inputValidationResultMiddleware, (req: Request<{ id: string }>, res: Response) => {
        const postId = Number(req.params.id);
        const selectedPost = db.posts[postId];

        if (!selectedPost) {
            res.status(HTTP_STATUS.NOT_FOUND_404).send(createNotFoundError('id'));
            return;
        }

        delete db.posts[postId];
        res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
    });
