import { Router } from 'express';
import { getPostListHandler } from './handlers/get-post-list.handler.js';
import { getPostHandler } from './handlers/get-post.handler.js';
import { createPostHandler } from './handlers/create-post.handler.js';
import { updatePostHandler } from './handlers/update-post.handler.js';
import { deletePostHandler } from './handlers/delete-post.handler.js';
import { inputValidationResultMiddleware } from '../../../core/middlewares/input-validation-result.middleware.js';
import { paramIdValidation } from '../../../core/middlewares/params-id-validation.middleware.js';
import { superAdminGuardMiddleware } from '../../../auth/middlewares/super-admin.guard.middleware.js';
import { postCreateValidation, postUpdateValidation } from '../validation/post.validation.js';
import { POSTS_ROUTES } from '../constants/posts.paths.js';

export const postsRouter = Router({});

postsRouter
    .get(POSTS_ROUTES.ROOT, getPostListHandler)

    .get(POSTS_ROUTES.BY_ID, paramIdValidation, inputValidationResultMiddleware, getPostHandler)

    .post(POSTS_ROUTES.ROOT, superAdminGuardMiddleware, postCreateValidation, inputValidationResultMiddleware, createPostHandler)

    .put(POSTS_ROUTES.BY_ID, superAdminGuardMiddleware, paramIdValidation, postUpdateValidation, inputValidationResultMiddleware, updatePostHandler)

    .delete(POSTS_ROUTES.BY_ID, superAdminGuardMiddleware, paramIdValidation, inputValidationResultMiddleware, deletePostHandler);
