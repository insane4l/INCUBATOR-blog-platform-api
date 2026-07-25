import { body, ValidationChain } from 'express-validator';
import { createErrorMessage } from './validation-messages.js';
import { AttributeValidationRules } from './validation.types.js';

type ValidationOperation = 'create' | 'update';

export const buildValidationChain = (requirements: Record<string, AttributeValidationRules>, operation: ValidationOperation): ValidationChain[] => {
    return Object.values(requirements).map((field) => {
        let validator = body(field.name);

        // required / optional / nullable
        if (field.required[operation]) {
            validator = validator
                .exists({ values: 'undefined' })
                .withMessage(createErrorMessage(field.name, field.type, 'required'))
                .bail();
        } else {
            validator = validator.optional({
                nullable: field.nullable,
            });
        }

        // type validation
        switch (field.type) {
            case 'string':
                validator = validator
                    .isString()
                    .withMessage(createErrorMessage(field.name, field.type, 'type'))
                    .bail();
                break;

            case 'number':
                validator = validator
                    .isNumeric()
                    .withMessage(createErrorMessage(field.name, field.type, 'type'))
                    .bail();
                break;

            case 'boolean':
                validator = validator
                    .isBoolean()
                    .withMessage(createErrorMessage(field.name, field.type, 'type'))
                    .bail();
                break;

            case 'array':
                validator = validator
                    .isArray()
                    .withMessage(createErrorMessage(field.name, field.type, 'type'))
                    .bail();
                break;
        }

        // trim strings
        if (field.type === 'string') {
            validator = validator.trim();
        }

        // string / array / number limits
        if (field.minLength !== undefined) {
            if (field.type === 'string') {
                validator = validator
                    .isLength({
                        min: field.minLength,
                    })
                    .withMessage(createErrorMessage(field.name, field.type, 'minLength', field.minLength))
                    .bail();
            }

            if (field.type === 'array') {
                validator = validator
                    .isArray({
                        min: field.minLength,
                    })
                    .withMessage(createErrorMessage(field.name, field.type, 'minLength', field.minLength))
                    .bail();
            }

            if (field.type === 'number') {
                validator = validator
                    .isFloat({
                        min: field.minLength,
                    })
                    .withMessage(createErrorMessage(field.name, field.type, 'minLength', field.minLength))
                    .bail();
            }
        }

        if (field.maxLength !== undefined) {
            if (field.type === 'string') {
                validator = validator
                    .isLength({
                        max: field.maxLength,
                    })
                    .withMessage(createErrorMessage(field.name, field.type, 'maxLength', field.maxLength))
                    .bail();
            }

            if (field.type === 'array') {
                validator = validator
                    .isArray({
                        max: field.maxLength,
                    })
                    .withMessage(createErrorMessage(field.name, field.type, 'maxLength', field.maxLength))
                    .bail();
            }

            if (field.type === 'number') {
                validator = validator
                    .isFloat({
                        max: field.maxLength,
                    })
                    .withMessage(createErrorMessage(field.name, field.type, 'maxLength', field.maxLength))
                    .bail();
            }
        }

        // format
        if (field.format) {
            switch (field.format) {
                case 'date-time':
                    validator = validator
                        .isISO8601()
                        .withMessage(createErrorMessage(field.name, field.type, 'format'))
                        .bail();
                    break;

                case 'email':
                    validator = validator
                        .isEmail()
                        .withMessage(createErrorMessage(field.name, field.type, 'format'))
                        .bail();
                    break;
            }
        }

        // regexp
        if (field.regExp) {
            validator = validator
                .matches(field.regExp)
                .withMessage(createErrorMessage(field.name, field.type, 'format'))
                .bail();
        }

        // allowed values
        if (field.allowedValues) {
            validator = validator
                .custom((value) => {
                    if (Array.isArray(value)) {
                        return value.every((item) => field.allowedValues!.includes(item));
                    }

                    return field.allowedValues!.includes(value);
                })
                .withMessage(createErrorMessage(field.name, field.type, 'allowedValues', field.allowedValues))
                .bail();
        }

        return validator;
    };);
};
