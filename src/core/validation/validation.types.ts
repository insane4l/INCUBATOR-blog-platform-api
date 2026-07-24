type FieldType = 'string' | 'number' | 'boolean' | 'array';
type FieldFormat = 'date-time' | 'email';

export type AttributeValidationRules = {
    name: string;
    type: FieldType;
    required: { create: boolean; update: boolean };
    nullable?: boolean;
    minLength?: number;
    maxLength?: number;
    format?: FieldFormat;
    regExp?: RegExp;
    allowedValues?: readonly string[];
};

/**
 * Maps each entity attribute to its validation rules.
 *
 * @typeParam TAttributes - The type representing the entity's attributes.
 */
export type FieldRules<TAttributes> = Record<keyof TAttributes, AttributeValidationRules>;

export type ValidationErrorType = {
    message: string;
    field: string;
};
