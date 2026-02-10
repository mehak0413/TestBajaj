/**
 * validators.js — Pure validation functions.
 *
 * Each validator returns { valid: boolean, error?: string, parsed?: any }.
 * `parsed` carries the value in the shape the API expects so callers
 * never need to re-parse.
 */

/**
 * Validate a single non-negative integer for Fibonacci.
 */
export function validateFibonacci(raw) {
    const trimmed = raw.trim();
    if (trimmed === '') return { valid: false, error: 'Please enter a number.' };

    const num = Number(trimmed);
    if (!Number.isFinite(num) || !Number.isInteger(num)) {
        return { valid: false, error: 'Value must be a whole number.' };
    }
    if (num < 0) {
        return { valid: false, error: 'Value must be non-negative.' };
    }
    return { valid: true, parsed: num };
}

/**
 * Validate a comma-separated list of integers (for Prime / LCM / HCF).
 */
export function validateNumberArray(raw) {
    const trimmed = raw.trim();
    if (trimmed === '') return { valid: false, error: 'Please enter comma-separated numbers.' };

    const parts = trimmed.split(',').map((s) => s.trim());

    if (parts.some((p) => p === '')) {
        return { valid: false, error: 'Contains empty values. Check your commas.' };
    }

    const nums = parts.map(Number);

    if (nums.some((n) => !Number.isFinite(n) || !Number.isInteger(n))) {
        return { valid: false, error: 'All values must be whole numbers.' };
    }

    if (nums.some((n) => n < 0)) {
        return { valid: false, error: 'Negative numbers are not allowed.' };
    }

    if (nums.length === 0) {
        return { valid: false, error: 'Please provide at least one number.' };
    }

    return { valid: true, parsed: nums };
}

/**
 * Validate a non-empty text string for AI.
 */
export function validateAIQuestion(raw) {
    const trimmed = raw.trim();
    if (trimmed === '') return { valid: false, error: 'Please enter a question.' };
    return { valid: true, parsed: trimmed };
}

/**
 * Route to the correct validator based on operation key.
 * @param {string} operation
 * @param {string} raw
 */
export function validate(operation, raw) {
    switch (operation) {
        case 'fibonacci':
            return validateFibonacci(raw);
        case 'prime':
        case 'lcm':
        case 'hcf':
            return validateNumberArray(raw);
        case 'AI':
            return validateAIQuestion(raw);
        default:
            return { valid: false, error: 'Select an operation first.' };
    }
}
