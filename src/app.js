import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import * as apiController from './controller/apiController.js';
import { validateBfhlInput } from './middleware/validationMiddleware.js';
import { errorHandler } from './middleware/errorMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(helmet()); // Security headers
app.use(cors());
app.use(express.json({ limit: '10kb' })); // Body size limit for security

// API Routes
app.get('/health', apiController.getHealth);
app.post('/bfhl', validateBfhlInput, apiController.handleBfhl);

// Serve frontend static files
app.use(express.static(join(__dirname, '..', 'frontend')));

// Fallback: serve index.html for any unmatched GET request
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '..', 'frontend', 'index.html'));
});

// Error Handling Middleware
app.use(errorHandler);

export default app;
