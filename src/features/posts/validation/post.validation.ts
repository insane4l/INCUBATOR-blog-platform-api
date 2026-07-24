import { buildValidationChain } from '../../../core/validation/validation-builder.js';
import { postFieldRules } from './post.validation-rules.js';

export const postCreateValidation = buildValidationChain(postFieldRules, 'create');
export const postUpdateValidation = buildValidationChain(postFieldRules, 'update');
