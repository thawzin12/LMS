const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const check = require('../utilities/custommiddleware');
const { Student, Grade, Semester, Section } = require('../models'); // Ensure models are imported correctly

// Route to render the form to create a new student
router.get('/create-student', check.ensureAdminAuthenticated, async (req, res) => {
    try {
        // Fetch all grades, semesters, and sections
        const grades = await Grade.findAll();
        const semesters = await Semester.findAll();
        const sections = await Section.findAll();

        res.render('create-student', { data: {}, grades, semesters, sections, errors: {}, success: {} });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to handle student creation
router.post('/create-student', check.ensureAdminAuthenticated, async (req, res) => {
    const { email, name, password, roll_number, grade_id, semester_id, section_id } = req.body;

    let errors = {};
    let success = {};

    // Validate inputs
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
        const passwordValidationResult = isValidPassword(password);
        if (passwordValidationResult.error) {
            errors.password = passwordValidationResult.error;
        }
    }

    if (!roll_number) {
        errors.roll_number = 'Roll number is required';
    }

    if (!grade_id) {
        errors.grade_id = 'Grade is required';
    }

    if (!semester_id) {
        errors.semester_id = 'Semester is required';
    }

    if (!section_id) {
        errors.section_id = 'Section is required';
    }

    if (Object.keys(errors).length > 0) {
        const grades = await Grade.findAll();
        const semesters = await Semester.findAll();
        const sections = await Section.findAll();

        res.render('create-student', { data: req.body, grades, semesters, sections, errors, success });
        return;
    }

    try {
        // Check if a student with the same email already exists
        const existingStudent = await Student.findOne({ where: { email } });
        if (existingStudent) {
            errors.general = 'Student with this email already exists';
            const grades = await Grade.findAll();
            const semesters = await Semester.findAll();
            const sections = await Section.findAll();
            res.render('create-student', { data: req.body, grades, semesters, sections, errors, success });
            return;
        }

        // Check if the roll number is unique
        const existingRollNumber = await Student.findOne({ where: { roll_number } });
        if (existingRollNumber) {
            errors.roll_number = 'Roll number already exists. Please choose a different roll number.';
            const grades = await Grade.findAll();
            const semesters = await Semester.findAll();
            const sections = await Section.findAll();
            res.render('create-student', { data: req.body, grades, semesters, sections, errors, success });
            return;
        }

        // Hash the password and create the new student record
        const hashedPassword = await bcrypt.hash(password, 10);
        await Student.create({ email, name, password: hashedPassword, roll_number, grade_id, semester_id, section_id });

        success.suc = 'Student Account Creation Successful';
        const grades = await Grade.findAll();
        const semesters = await Semester.findAll();
        const sections = await Section.findAll();
        res.render('create-student', { data: {}, grades, semesters, sections, errors: {}, success });

    } catch (error) {
        console.error('Error creating student:', error);
        errors.general = 'Error creating student account';
        const grades = await Grade.findAll();
        const semesters = await Semester.findAll();
        const sections = await Section.findAll();
        res.render('create-student', { data: req.body, grades, semesters, sections, errors, success });
    }
});

module.exports = router;

// Utility functions for validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidName(name) {
    const namePattern = /^[a-zA-Z\s]+$/;
    return namePattern.test(name);
}

function isValidPassword(password) {
    if (password.length < 8 || password.length > 16) {
        return { error: "Password must be between 8 and 16 characters" };
    }

    if (!/[A-Z]/.test(password)) {
        return { error: "Password must include at least one uppercase letter" };
    }

    if (!/[a-z]/.test(password)) {
        return { error: "Password must include at least one lowercase letter" };
    }

    if (!/\d/.test(password)) {
        return { error: "Password must include at least one number" };
    }

    if (!/[\W_]/.test(password)) {
        return { error: "Password must include at least one special character." };
    }

    return {};
}
