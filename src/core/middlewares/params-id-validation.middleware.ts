import { param } from 'express-validator';
import { createInvalidIdErrorMessage } from '../validation/validation-messages.js';

export const paramIdValidation = param('id')
    .exists()
    .withMessage(createInvalidIdErrorMessage('required'))
    .isString()
    .withMessage(createInvalidIdErrorMessage('string'))
    .isNumeric()
    .withMessage(createInvalidIdErrorMessage('numeric'));
