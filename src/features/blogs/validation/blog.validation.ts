import { buildValidationChain } from '../../../core/validation/validation-builder.js';
import { blogFieldRules } from './blog.validation-rules.js';

export const blogCreateValidation = buildValidationChain(blogFieldRules, 'create');
export const blogUpdateValidation = buildValidationChain(blogFieldRules, 'update');
