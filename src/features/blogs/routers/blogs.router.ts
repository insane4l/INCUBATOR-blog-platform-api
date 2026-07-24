import { Router } from 'express';
import { getBlogHandler } from './handlers/get-blog.handler.js';
import { getBlogListHandler } from './handlers/get-blog-list.handler.js';
import { createBlogHandler } from './handlers/create-blog.handler.js';
import { updateBlogHandler } from './handlers/update-blog.handler.js';
import { deleteBlogHandler } from './handlers/delete-blog.handler.js';
import { inputValidationResultMiddleware } from '../../../core/middlewares/input-validation-result.middleware.js';
import { paramIdValidation } from '../../../core/middlewares/params-id-validation.middleware.js';
import { superAdminGuardMiddleware } from '../../../auth/middlewares/super-admin.guard.middleware.js';
import { blogCreateValidation, blogUpdateValidation } from '../validation/blog.validation.js';
import { BLOGS_ROUTES } from '../constants/blogs.paths.js';

export const blogsRouter = Router({});

blogsRouter
    .get(BLOGS_ROUTES.ROOT, getBlogListHandler)

    .get(BLOGS_ROUTES.BY_ID, paramIdValidation, inputValidationResultMiddleware, getBlogHandler)

    .post(BLOGS_ROUTES.ROOT, superAdminGuardMiddleware, blogCreateValidation, inputValidationResultMiddleware, createBlogHandler)

    .put(BLOGS_ROUTES.BY_ID, superAdminGuardMiddleware, paramIdValidation, blogUpdateValidation, inputValidationResultMiddleware, updateBlogHandler)

    .delete(BLOGS_ROUTES.BY_ID, superAdminGuardMiddleware, paramIdValidation, inputValidationResultMiddleware, deleteBlogHandler);
