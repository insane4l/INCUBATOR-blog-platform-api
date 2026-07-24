import { FieldRules } from '../../../core/validation/validation.types.js';
import { PostAttributes } from '../dto/post-attributes.js';

export const postFieldRules: FieldRules<PostAttributes> = {
    title: {
        name: 'title',
        type: 'string',
        required: { create: true, update: true },
        minLength: 1,
        maxLength: 30,
    },
    shortDescription: {
        name: 'shortDescription',
        type: 'string',
        required: { create: true, update: true },
        minLength: 1,
        maxLength: 100,
    },
    content: {
        name: 'content',
        type: 'string',
        required: { create: true, update: true },
        minLength: 1,
        maxLength: 1000,
    },
    blogId: {
        name: 'blogId',
        type: 'string',
        required: { create: true, update: true },
    },
};
