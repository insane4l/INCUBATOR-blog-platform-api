import { Request, Response, NextFunction } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import { ValidationErrorType } from '../validation/validation.types.js';
import { HTTP_STATUS } from '../constants/http-status.constants.js';

// Converts the express-validator error to our { field, message } format.
// Errors of type 'field' have a field path.
const formatErrors = (error: ValidationError): ValidationErrorType => {
    if (error.type === 'field') {
        return { field: error.path, message: error.msg };
    }

    // We don't use other express-validator error types.
    return { field: '', message: error.msg };
};

// Collects the results of all request validators. If there are errors, it responds with a 400 response.
// Otherwise, it passes control to the next handler.
export const inputValidationResultMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).formatWith(formatErrors).array({ onlyFirstError: true });

    if (errors.length > 0) {
        res.status(HTTP_STATUS.BAD_REQUEST_400).json({ errorsMessages: errors });
        return;
    }

    next();
};
