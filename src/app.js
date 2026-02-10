import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import * as apiController from './controller/apiController.js';
import { validateBfhlInput } from './middleware/validationMiddleware.js';
import { errorHandler } from './middleware/errorMiddleware.js';

const app = express();

app.use(helmet()); // Security headers
app.use(cors());
app.use(express.json({ limit: '10kb' })); // Body size limit for security

// Routes
app.get('/health', apiController.getHealth);
app.post('/bfhl', validateBfhlInput, apiController.handleBfhl);

// Error Handling Middleware
app.use(errorHandler);

export default app;
