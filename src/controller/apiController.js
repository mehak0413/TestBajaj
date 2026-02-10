import * as mathService from '../service/mathService.js';
import * as aiService from '../service/aiService.js';
import { successResponse,  healthResponse } from '../utils/responseUtil.js';

export const getHealth = (req, res) => {
    res.status(200).json(healthResponse());
};

export const handleBfhl = async (req, res, next) => {
    try {
        const body = req.body;
        const key = Object.keys(body)[0];
        const value = body[key];
        
        let result;

        switch (key) {
            case 'fibonacci':
                result = mathService.getFibonacci(value);
                break;
            case 'prime':
                result = mathService.getPrimes(value);
                break;
            case 'lcm':
                result = mathService.getLcm(value);
                break;
            case 'hcf':
                result = mathService.getHcf(value);
                break;
            case 'AI':
                result = await aiService.getAiAnswer(value);
                break;
            default:
                // This should be caught by validation middleware, but for safety
                throw new Error("Invalid key processing");
        }

        res.status(200).json(successResponse(result));
    } catch (error) {
        next(error);
    }
};
