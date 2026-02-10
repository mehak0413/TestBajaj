import { errorResponse } from '../utils/responseUtil.js';

export const validateBfhlInput = (req, res, next) => {
    const body = req.body;
    const keys = Object.keys(body);

    // 1. Check if body is empty
    if (keys.length === 0) {
        return res.status(400).json(errorResponse("Request body cannot be empty"));
    }

    // 2. Check if more than one key
    if (keys.length > 1) {
        return res.status(400).json(errorResponse("Request body must contain exactly one key"));
    }

    const key = keys[0];
    const value = body[key];
    const validKeys = ['fibonacci', 'prime', 'lcm', 'hcf', 'AI'];

    // 3. Check if key is valid
    if (!validKeys.includes(key)) {
        return res.status(400).json(errorResponse("Invalid key. Allowed keys: fibonacci, prime, lcm, hcf, AI"));
    }

    // 4. Validate Data Types
    switch (key) {
        case 'fibonacci':
            if (!Number.isInteger(value) || value < 0) {
                return res.status(400).json(errorResponse("Value for 'fibonacci' must be a non-negative integer"));
            }
            break;
        case 'prime':
        case 'lcm':
        case 'hcf':
            if (!Array.isArray(value) || !value.every(Number.isInteger)) {
                return res.status(400).json(errorResponse(`Value for '${key}' must be an array of integers`));
            }
            if (value.length === 0) {
                 return res.status(400).json(errorResponse(`Value for '${key}' cannot be an empty array`));
            }
            break;
        case 'AI':
            if (typeof value !== 'string' || value.trim().length === 0) {
                return res.status(400).json(errorResponse("Value for 'AI' must be a non-empty string"));
            }
            break;
    }

    next();
};
