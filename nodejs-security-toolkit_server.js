const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcrypt');
const Joi = require('joi');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Security Headers via Helmet
app.use(helmet());

// 2. Parse JSON bodies
app.use(express.json());

// 3. Global Rate Limiting (100 requests per 15 minutes per IP)
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: 'Too many requests from this IP, please try again after 15 minutes.' }
});
app.use(globalLimiter);

// 4. Strict Rate Limiter for Auth Endpoints (5 attempts per 15 mins)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { error: 'Too many authentication attempts. Account locked temporarily for 15 minutes.' }
});

// Mock Database
const users = [];

// Joi Validation Schemas
const userRegistrationSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(128).required()
});

// Registration Endpoint
app.post('/api/register', authLimiter, async (req, res, next) => {
    try {
        // Validate request body
        const { error, value } = userRegistrationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { username, email, password } = value;

        // Hash password securely (10 salt rounds)
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Store user securely
        const newUser = { id: users.length + 1, username, email, password: hashedPassword };
        users.push(newUser);

        res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
    } catch (err) {
        next(err);
    }
});

// Secure Error Handling Middleware (No Stack Traces Leaked)
app.use((err, req, res, next) => {
    console.error(`[ERROR]: ${err.message}`);
    res.status(500).json({
        error: process.env.NODE_ENV === 'production' 
            ? 'Internal server error occurred.' 
            : err.message
    });
});

app.listen(PORT, () => {
    console.log(`[+] Secure Node.js Server listening on port ${PORT}`);
});
