const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
router.use(express.json());
const check = require('../utilities/custommiddleware');
router.use(express.urlencoded({ extended: true }));
const { isValidEmail, isValidName, isValidPassword } = require('../utilities/validation');

const sequelize = require('../config/database');
const { Teacher, Grade, Semester, Section, Course, Taught } = require('../models');

// Render the create teacher form
router.get('/createteacher', check.ensureAdminAuthenticated, (req, res) => {
    res.render('createteacher', { data: {}, errors: {}, success: {} });
});

// Handle form submission for teacher creation
router.post('/createteacher', check.ensureAdminAuthenticated, async (req, res) => {
    const { email, name, password } = req.body;

    let errors = {};
    let success = {};

    // Validate inputs using utility functions
    if (!email) {
        errors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
        errors.email = 'Invalid email format';
    }

    if (!name) {
        errors.name = 'Name is required';
    } else if (!isValidName(name)) {
        errors.name = 'Name must contain only letters and spaces';
    }

    if (!password) {
        errors.password = 'Password is required';
    } else {
        var passwordValidationResult = isValidPassword(password);
        if (passwordValidationResult.error) {
            errors.password = passwordValidationResult.error;
        }
    }


    if (Object.keys(errors).length > 0) {
        res.render('createteacher', { data: req.body, errors, success });
        return;
    }

    try {
        const connection = req.app.get('db');

        // Check if a teacher with the same email already exists
        const [existingUsers] = await connection.execute('SELECT * FROM teachers WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            errors.general = 'Teacher with this email already exists';
            res.render('createteacher', { data: req.body, errors, success });
            return;
        }

        // Hash the password and insert the new teacher record
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO teachers (email, name, password) VALUES (?, ?, ?)';
        await connection.execute(query, [email, name, hashedPassword]);

        success.suc = 'Teacher Account Creation Successful';
        res.render('createteacher', { data: {}, errors, success });

    } catch (error) {
        console.error('Error:', error);
        errors.general = 'Error creating teacher account';
        res.render('createteacher', { data: req.body, errors, success });
    }
});


module.exports = router;

