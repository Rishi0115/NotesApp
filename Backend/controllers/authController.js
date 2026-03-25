const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

/**
 * Helper — create token and send response.
 */
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.generateToken();

    res.status(statusCode).json({
        success: true,
        token,
        data: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    });
};

// ─── Signup ───────────────────────────────────────────────────
// POST /api/auth/signup
exports.signup = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new AppError('Email is already registered', 400);
    }

    const user = await User.create({ name, email, password });

    sendTokenResponse(user, 201, res);
});

// ─── Login ────────────────────────────────────────────────────
// POST /api/auth/login
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Find user and include password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        throw new AppError('Invalid email or password', 401);
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new AppError('Invalid email or password', 401);
    }

    sendTokenResponse(user, 200, res);
});

// ─── Get Current User ────────────────────────────────────────
// GET /api/auth/me
exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        data: user,
    });
});
