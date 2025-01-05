const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const route = express.Router();
const bodyparser = require('body-parser');
route.use(bodyparser.json()); // Parse JSON
const uuid = require('uuid');
const session = require('express-session');
const bcrypt = require('bcrypt');
var log = console.log;
const check = require('../utilities/custommiddleware');

route.get('/signup', (req, res) => {
    res.render('signup', { data: {}, errors: {} });
});


route.get('/login', (req, res) => {
    console.log("User requested login page");
    res.render('login', { data: {}, errors: {} });
});
route.post('/login', async (req, res) => {
    const { email, password, role } = req.body;
    let errors = {};
    let connection = req.app.get('db');
    let user = null;

    // Validate email, password, and role
    if (!email) {
        errors.email = 'Email must be filled';
    } else if (!isValidEmail(email)) {
        errors.email = 'Email is invalid';
    }

    if (!password) {
        errors.password = 'Password must be filled';
    }

    if (!role) {
        errors.role = 'Role must be selected';
    }

    if (Object.keys(errors).length > 0) {
        return res.render('login', { data: req.body, errors });
    }

    try {
        let query = '';
        switch (role) {
            case 'admin':
                query = "SELECT * FROM admin WHERE email = ?";
                break;
            case 'teacher':
                query = "SELECT * FROM teachers WHERE email = ?";
                break;
            case 'student':
                query = "SELECT * FROM students WHERE email = ?";
                break;
            default:
                throw new Error('Invalid role');
        }

        const [results] = await connection.query(query, [email]);

        if (results.length === 0) {
            errors.email = 'Email not found';
            return res.render('login', { data: req.body, errors });
        }

        user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            errors.password = 'Password is incorrect';
            return res.render('login', { data: req.body, errors });
        }

        // Update session properties individually
        req.session.email = user.email;
        req.session.role = role;
        req.session.userId = uuid.v4();

        if (role === 'student') {
            req.session.role = 'student';
            req.session.username = user.name;
            req.session.studentId = user.student_id;
            req.session.grade = user.grade_id;
            req.session.semester = user.semester_id;
            req.session.section = user.section_id; // Assumes student table has semester_id
        } else if (role === 'teacher') {
            req.session.tname = user.name;
            req.session.role = 'teacher';
            req.session.teacherId = user.teacher_id;
        } else if (role === 'admin') {
            req.session.aname = user.name;
            req.session.role = 'admin';
            req.session.adminId = user.admin_id;
        }

        // Debugging output to ensure session properties are set correctly
        console.log('Session after setting properties:', req.session);

        // Redirect based on role
        if (role === 'admin') {
            console.log('Admin ID is', req.session.adminId);
            console.log('Admin role is', req.session.role);
            return res.redirect('/admin/adminhome');
        } else if (role === 'teacher') {
            console.log('Teacher ID is', req.session.teacherId);
            console.log('Teacher role is', req.session.role);
            return res.redirect('/post-question');
        } else if (role === 'student') {
            console.log('Student ID is', req.session.studentId);
            console.log('Student role is', req.session.role);
            return res.redirect('/studenthome');
        }

    } catch (error) {
        console.error('Database query error:', error);
        return res.status(500).send('Internal Server Error');
    }
});

// Utility function for email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

var hashedPassword;

route.post('/signup', async (req, res) => {
    const { email, name, password, age } = req.body;
    let reg = /([A-Za-z0-9])\@gmail.com/;
    namepattern = /^[a-zA-Z\s]+$/;

    var errors = {};

    if (!email) {
        errors.email = 'Email is required';
    }
    if (!name) {
        errors.name = 'Name is required';
    }
    if (!namepattern.test(name)) {
        errors.name = 'name is invalid';
    }
    // if (!age) {
    //     errors.age = 'this field must be filled'
    // }

    else if (!isValidEmail(email) || !reg.test(email)) {
        errors.email = 'Invalid email format';
    }
    if (!password) {
        errors.password = 'Password is required';
    }
    if (Object.keys(errors).length > 0) {
        res.render('signup', { data: req.body, errors });
        return;
    }
    try {
        var connection = req.app.get('db');
        const [existingUsers] =
            await connection.execute('SELECT * FROM admin WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            errors.general = 'User with this email already exists';
            res.render('signup', { data: req.body, errors });
            return;
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log(hashedPassword);
            var placeholder = 'INSERT INTO admin (email,name, password) VALUES ( ?, ?,?)';
            await connection.execute(placeholder, [email, name, hashedPassword]);
            res.redirect('/login'); // Redirect to login page after successful signup
        }
    }
    catch (error) {
        console.error('Error:', error);
        errors.general = 'Error creating user';
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
//start of forgetpassword section

module.exports = route;

