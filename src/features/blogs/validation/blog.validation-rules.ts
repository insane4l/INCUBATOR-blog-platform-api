import { BlogAttributes } from '../dto/blog-attributes.js';
import { FieldRules } from '../../../core/validation/validation.types.js';

export const blogFieldRules: FieldRules<BlogAttributes> = {
    name: {
        name: 'name',
        type: 'string',
        required: { create: true, update: true },
        minLength: 1,
        maxLength: 15,
    },
    description: {
        name: 'description',
        type: 'string',
        required: { create: true, update: true },
        minLength: 1,
        maxLength: 500,
    },
    websiteUrl: {
        name: 'websiteUrl',
        type: 'string',
        required: { create: true, update: true },
        minLength: 4,
        maxLength: 100,
        regExp: /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/,
    },
};
