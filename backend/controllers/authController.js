const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'supersecretkey', {
        expiresIn: '30d',
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please add all fields' });
        }

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Authenticate a user (Step 1: Verify credentials and send OTP)
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Check for user email
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            if (role && user.role !== role) {
                return res.status(401).json({ message: 'Invalid role for this user' });
            }
            
            // Generate OTP (6 digits)
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            console.log(`OTP for ${email} is ${otp}`);

            // Send Email
            const htmlContent = `<div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                <h2>Welcome back to UniApp!</h2>
                <p>Your Two-Factor Authentication code is:</p>
                <h1 style="color: #4f46e5; letter-spacing: 5px; font-size: 32px;">${otp}</h1>
                <p>This code will expire in 10 minutes.</p>
                <p>If you did not request this login, please ignore this email.</p>
            </div>`;

            try {
                await sendEmail({
                    email: user.email,
                    subject: 'Your UniApp Login OTP Code',
                    html: htmlContent
                });
            } catch (emailError) {
                console.error("Email sending failed:", emailError);
                return res.status(500).json({ message: 'Error sending OTP email' });
            }

            // Save OTP to user (expires in 10 minutes)
            user.otp = otp;
            user.otpExpires = Date.now() + 10 * 60 * 1000;
            await user.save();

            res.json({
                message: 'OTP generated. Please verify to login.',
                email: user.email,
                role: user.role,
                otp: otp // Return OTP for easy testing
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Verify OTP and complete login
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        if (user.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'OTP expired' });
        }

        // OTP is valid, clear it
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    verifyOTP,
    getMe,
};
