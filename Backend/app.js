const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const AppError = require('./utils/AppError');
const errorHandler = require('./middleware/errorHandler');

// Route files
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');

const app = express();

// ─── Security Headers ─────────────────────────────────────────
app.use(helmet());

// ─── CORS ─────────────────────────────────────────────────────
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// ─── Logging ──────────────────────────────────────────────────
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// ─── Body Parser ──────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ─────────────────────────────────────────────
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: '📝 Notes API is running',
    });
});

// ─── Mount Routes ─────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// ─── 404 Handler ──────────────────────────────────────────────
app.all('*', (req, res, next) => {
    next(new AppError(`Cannot find ${req.method} ${req.originalUrl}`, 404));
});

// ─── Global Error Handler ─────────────────────────────────────
app.use(errorHandler);

module.exports = app;
