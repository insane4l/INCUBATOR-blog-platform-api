import { Router, Request, Response } from 'express';
import { BlogListOutput } from './dto/blog.output.js';
import { HTTP_STATUS } from '../../core/constants/http-status.constants.js';
import { db } from '../../db/in-memory.db.js';
import { mapToBlogListOutput } from './mappers/map-list-blog-to-output.js';
import { createNotFoundError } from '../../core/utils/error.utils.js';
import { mapToBlogOutput } from './mappers/map-blog-to-output.js';
import { BlogCreateInput, BlogUpdateInput } from './dto/blog.input.js';

export const blogsRouter = Router({});

blogsRouter
    .get('', (req: Request, res: Response<BlogListOutput>) => {
        res.status(HTTP_STATUS.OK_200).send(mapToBlogListOutput(db.blogs));
    })

    .get('/:id', (req: Request<{ id: string }>, res: Response) => {
        const blogId = Number(req.params.id);
        const selectedBlog = db.blogs[blogId];

        if (!selectedBlog) {
            res.status(HTTP_STATUS.NOT_FOUND_404).send(createNotFoundError('id'));
            return;
        }

        res.status(HTTP_STATUS.OK_200).send(mapToBlogOutput(blogId, selectedBlog));
    })

    .post('', (req: Request<{}, {}, BlogCreateInput>, res: Response) => {
        const attributes = req.body;

        // const errors = validateBlogAttributes(attributes, 'createBlog');

        // if (errors.length > 0) {
        //     res.status(HTTP_STATUS.BAD_REQUEST_400).send(createErrorMessages(errors));
        //     return;
        // }

        const id = Date.now() + Math.floor(Math.random() * 1000);

        const newBlog = {
            id,
            ...attributes, // todo: need to trim all user data with type 'string' .trim()
        };

        db.blogs[id] = attributes;

        res.status(HTTP_STATUS.CREATED_201).send(newBlog);
    })

    .put('/:id', (req: Request<{ id: string }, {}, BlogUpdateInput>, res: Response) => {
        const blogId = Number(req.params.id);
        const selectedBlog = db.blogs[blogId];

        if (!selectedBlog) {
            res.status(HTTP_STATUS.NOT_FOUND_404).send(createNotFoundError('id'));
            return;
        }

        const attributes = req.body;

        // const errors = validateBlogAttributes(attributes, 'updateBlog');

        // if (errors.length > 0) {
        //     res.status(HTTP_STATUS.BAD_REQUEST_400).send(createErrorMessages(errors));
        //     return;
        // }

        db.blogs[blogId] = attributes;
        res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
    })

    .delete('/:id', (req: Request<{ id: string }>, res: Response) => {
        const blogId = Number(req.params.id);
        const selectedBlog = db.blogs[blogId];

        if (!selectedBlog) {
            res.status(HTTP_STATUS.NOT_FOUND_404).send(createNotFoundError('id'));
            return;
        }

        delete db.blogs[blogId];
        res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
    });
