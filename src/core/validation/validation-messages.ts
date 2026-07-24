import { ValidationErrorType } from './validation.types.js';

export const createValidationErrorResponse = (errors: ValidationErrorType[]): { errorsMessages: ValidationErrorType[] } => {
    return { errorsMessages: errors };
};

export const createNotFoundError = (field: string): { errorsMessages: ValidationErrorType[] } => {
    return createValidationErrorResponse([{ message: 'Entity not found', field }]);
};

export const createInvalidIdErrorMessage = (errorType: 'required' | 'string' | 'numeric') => {
    if (errorType === 'required') {
        return 'ID is required';
    }
    if (errorType === 'string') {
        return 'ID must be a string';
    }
    if (errorType === 'numeric') {
        return 'ID must be a numeric string';
    }
    return 'invalid ID';
};

export const createErrorMessage = (fieldName: string, fieldType: string, errorType: string, correctValue?: number | readonly string[]) => {
    if (errorType === 'required') {
        return `The ${fieldName} field is required`;
    }

    if (errorType === 'type') {
        return `The ${fieldName} field should be the ${fieldType}`;
    }

    if (errorType === 'format') {
        return `The ${fieldName} format is invalid`;
    }

    if (errorType === 'minLength') {
        if (fieldType === 'number') {
            return `Min value for the ${fieldName} field is ${correctValue}`;
        }

        if (fieldType === 'array') {
            return `Min length for the ${fieldName} array is ${correctValue}`;
        }

        return `The ${fieldName} field should contain min ${correctValue} characters`;
    }

    if (errorType === 'maxLength') {
        if (fieldType === 'number') {
            return `Max value for the ${fieldName} field is ${correctValue}`;
        }

        if (fieldType === 'array') {
            return `Max length for the ${fieldName} array is ${correctValue}`;
        }

        return `The ${fieldName} field should contain max ${correctValue} characters`;
    }

    if (errorType === 'allowedValues') {
        return `Field ${fieldName} should contain one of values: ${correctValue}`;
    }

    return `The ${fieldName} is invalid`;
};
