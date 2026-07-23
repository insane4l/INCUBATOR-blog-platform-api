import { ValidationErrorType } from '../types/validation-error.types.js';

export const createErrorMessages = (errors: ValidationErrorType[]): { errorsMessages: ValidationErrorType[] } => {
    return { errorsMessages: errors };
};

export const createNotFoundError = (field: string): { errorsMessages: ValidationErrorType[] } => {
    return createErrorMessages([{ message: 'Entity not found', field }]);
};
