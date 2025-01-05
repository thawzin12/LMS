const express = require('express');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const route = express.Router();
const dotenv = require('dotenv');
const { isValidEmail, isValidName, isValidPassword } = require('../utilities/validation');
dotenv.config();

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Generate OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Route to serve the forget password page
route.get('/forgetpassword', (req, res) => {
    res.render('forgetpassword', { error: null });
});

// Handle OTP request
route.post('/request-otp', async (req, res) => {
    const { email } = req.body;
    const db = req.app.get('db');

    if (!email) {
        return res.render('forgetpassword', { error: 'Email is required' });
    }

    let user = null;
    let role = '';

    // Check in admin table
    let [adminResult] = await db.query('SELECT * FROM admin WHERE email = ?', [email]);
    if (adminResult.length > 0) {
        user = adminResult[0];
        role = 'admin';
    }

    // Check in teachers table
    let [teacherResult] = await db.query('SELECT * FROM teachers WHERE email = ?', [email]);
    if (teacherResult.length > 0) {
        user = teacherResult[0];
        role = 'teacher';
    }

    // Check in students table
    let [studentResult] = await db.query('SELECT * FROM students WHERE email = ?', [email]);
    if (studentResult.length > 0) {
        user = studentResult[0];
        role = 'student';
    }

    // If no user found
    if (!user) {
        return res.render('forgetpassword', { error: 'Email does not exist' });
    }

    // Generate OTP and set expiry
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

    // Update OTP in the respective table
    if (role === 'admin') {
        await db.query('UPDATE admin SET otp = ?, otpExpiry = ? WHERE email = ?', [otp, otpExpiry, email]);
    } else if (role === 'teacher') {
        await db.query('UPDATE teachers SET otp = ?, otpExpiry = ? WHERE email = ?', [otp, otpExpiry, email]);
    } else if (role === 'student') {
        await db.query('UPDATE students SET otp = ?, otpExpiry = ? WHERE email = ?', [otp, otpExpiry, email]);
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
                <div style="text-align: center; padding-bottom: 20px;">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-JzRik33npSLHpZZWigCnM3kl0DRpf6K0IA&s" alt="University Logo" style="width: 100px; border-radius: 50%;">
                </div>
                <h2 style="color: #007bff; text-align: center; font-family: 'Roboto', sans-serif;">Your OTP Code</h2>
                <p style="font-size: 16px; color: #333;">
                    Dear ${user.name},
                </p>
                <p style="font-size: 16px; color: #333;">
                    Your OTP code is <strong style="font-size: 24px; color: #007bff;">${otp}</strong>.
                </p>
                <p style="font-size: 16px; color: #333;">
                    It is valid for 10 minutes. Please use this code to proceed with your request.
                </p>
                <p style="font-size: 16px; color: #333;">
                    If you did not request this OTP, please ignore this email.
                </p>
                <div style="text-align: center; margin-top: 30px;">
                    <a href="https://www.youtube.com/@Hyperthaw" target="_blank" style="background-color: #FF0000; color: white; padding: 10px 20px; text-decoration: none; font-size: 16px; border-radius: 5px; display: inline-block;">
                        Visit Our YouTube Channel
                    </a>
                </div>
                <p style="font-size: 16px; color: #333; margin-top: 30px;">
                    Best regards,<br>
                    <strong style="color: #007bff;">Magway Computer University</strong>
                </p>
                <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;">
                <p style="font-size: 12px; color: #999; text-align: center;">
                    &copy; 2023 Magway Computer University. All rights reserved.
                </p>
            </div>
        `
    };


    await transporter.sendMail(mailOptions);

    // Render the OTP page
    res.render('enter-otp', { email, role, error: null });
});

// Handle OTP verification
route.post('/verify-otp', async (req, res) => {
    const { email, otp, role } = req.body;
    const db = req.app.get('db');

    if (!email || !otp) {
        return res.render('enter-otp', { error: 'Email and OTP are required', email, role });
    }

    let query = '';
    if (role === 'admin') {
        query = 'SELECT otp, otpExpiry FROM admin WHERE email = ?';
    } else if (role === 'teacher') {
        query = 'SELECT otp, otpExpiry FROM teachers WHERE email = ?';
    } else if (role === 'student') {
        query = 'SELECT otp, otpExpiry FROM students WHERE email = ?';
    }

    const [results] = await db.query(query, [email]);

    if (results.length === 0) {
        return res.render('enter-otp', { error: 'Invalid email', email, role });
    }

    const { otp: storedOtp, otpExpiry } = results[0];

    const currentTime = new Date();
    const otpExpiryDate = new Date(otpExpiry);

    if (storedOtp !== otp || currentTime > otpExpiryDate) {
        return res.render('enter-otp', { error: 'Invalid or expired OTP', email, role });
    }

    // Store the role in the session instead of passing it in the URL
    req.session.resetPasswordEmail = email;
    req.session.resetPasswordRole = role;

    // Redirect to reset password page without including role in the URL
    res.redirect(`/reset-password`);
});

// Serve the reset password page
route.get('/reset-password', (req, res) => {
    const email = req.session.resetPasswordEmail;
    const role = req.session.resetPasswordRole;

    if (!email || !role) {
        return res.status(400).send('Invalid request. Please try again.');
    }

    res.render('reset-password', { email, error: null, role, newPassword: null });
});
// function isValidPassword(password) {
//     // Password validation logic here
//     return { error: null }; // Replace with actual validation logic
// }

route.post('/reset-password', async (req, res) => {
    const { email, newPassword } = req.body;
    const role = req.session.resetPasswordRole;
    const db = req.app.get('db');

    try {
        if (!email || !newPassword || !role) {
            return res.render('reset-password', { error: 'Email, new password, and role are required', email, role });
        }

        const passwordValidationResult = isValidPassword(newPassword);
        if (passwordValidationResult.error) {
            return res.render('reset-password', { error: passwordValidationResult.error, email, role, newPassword });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash the new password

        let updateQuery = '';
        if (role === 'admin') {
            updateQuery = `UPDATE admin SET password = ?, otp = NULL, otpExpiry = NULL WHERE email = ?`;
        } else if (role === 'teacher') {
            updateQuery = `UPDATE teachers SET password = ?, otp = NULL, otpExpiry = NULL WHERE email = ?`;
        } else if (role === 'student') {
            updateQuery = `UPDATE students SET password = ?, otp = NULL, otpExpiry = NULL WHERE email = ?`;
        } else {
            return res.render('reset-password', { error: 'Invalid role', email, role, newPassword });
        }

        await db.query(updateQuery, [hashedPassword, email]);

        // Clear the session variables after the password is reset
        req.session.resetPasswordEmail = null;
        req.session.resetPasswordRole = null;

        res.render('success');
    } catch (error) {
        console.error('Database error:', error);
        res.render('reset-password', { error: 'Internal server error', email });
    }
});

module.exports = route;
