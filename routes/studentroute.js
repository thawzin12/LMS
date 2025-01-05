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
const check = require('../utilities/custommiddleware');
/*
route.get('/view-titles', async (req, res) => {
    const [titles] = await db.query(
        'SELECT * FROM titles WHERE end_time > NOW()'
    );
    res.render('view-titles', { titles });
});

route.get('/answer-questions/:title_id', async (req, res) => {
    const titleId = req.params.title_id;
    const [questions] = await db.query(
        'SELECT * FROM questions WHERE title_id = ?',
        [titleId]
    );
    res.render('answer-questions', { questions, titleId });
});

route.post('/submit-answers/:title_id', async (req, res) => {
    const titleId = req.params.title_id;
    const studentId = req.session.studentId; // Assume student ID is stored in session
    const answers = req.body.answers; // Assume answers is an object { question_id: answer }

    for (let questionId in answers) {
        const answer = answers[questionId];
        await db.query(
            'INSERT INTO student_answers (student_id, question_id, student_answer, is_correct) VALUES (?, ?, ?, ?)',
            [studentId, questionId, answer, null] // `is_correct` can be set based on correct answer check
        );
    }

    res.redirect('/view-titles');
});
*/
route.get('/studenthome', check.ensureStudentAuthenticated, async (req, res) => {
    const pool = req.app.get('db');
    const { grade, semester } = req.session;
    var uname = req.session.username;
    const studentId = req.session.studentId;

    try {
        // Fetch courses available to all students in the same grade and semester
        const [courses] = await pool.query(
            `SELECT c.course_code, c.course_name 
             FROM courses c
             JOIN taught t ON c.course_code = t.course_code
             WHERE t.grade_id = ? AND t.semester_id = ?`,
            [grade, semester]
        );

        res.render('studenthome', { courses, uname });
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Internal Server Error');
    }
});


// route.get('/course/:courseCode', async (req, res) => {
//     const pool = req.app.get('db');
//     const { courseCode } = req.params;
//     console.log('This is the course code from the course');
//     var uname = req.session.username;

//     const { grade, semester, section } = req.session; // Extract grade, semester, section from session


//     // Check if the user is logged in
//     if (!req.session.studentId) {
//         return res.status(401).redirect('/login'); // Redirect to login if not logged in
//     }

//     try {
//         // Fetch course details based on courseCode
//         const [courseDetails] = await pool.query(
//             `SELECT * FROM courses WHERE course_code = ?`,
//             [courseCode]
//         );

//         // If no course found, return a 404 error
//         if (!courseDetails.length) {
//             return res.status(404).render('404', { message: 'Course not found', uname });
//         }

//         // Fetch titles associated with this course, grade, semester, and section
//         const [titles] = await pool.query(
//             `SELECT * FROM titles 
//              WHERE course_code = ? 
//              AND grade_id = ? 
//              AND semester_id = ? 
//              AND section_id = ?
//             AND end_time > NOW()`,
//             [courseCode, grade, semester, section]
//         );

//         // Render the course page and pass courseDetails and titles to the template
//         res.render('course', { courseDetails: courseDetails[0], titles, uname });
//     } catch (error) {
//         console.error('Error fetching course details or titles:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });


route.post('/course', check.ensureStudentAuthenticated, async (req, res) => {
    const pool = req.app.get('db');
    var uname = req.session.username;
    const { courseCode } = req.body;  // Retrieving course_code from the POST request body
    console.log('course code is from the course post', courseCode);
    req.session.courseCode = courseCode;
    console.log('this is coursecode from te course/post', req.session.courseCode);
    const { grade, semester, section } = req.session;


    // Check if the user is logged in
    if (!req.session.studentId) {
        return res.status(401).redirect('/login'); // Redirect to login if not logged in
    }

    try {
        // Fetch course details based on courseCode
        const [courseDetails] = await pool.query(
            `SELECT * FROM courses WHERE course_code = ?`,
            [courseCode]
        );

        // If no course found, return a 404 error
        if (!courseDetails.length) {
            return res.status(404).render('404', { message: 'Course not found' });
        }

        // Fetch titles associated with this course, grade, semester, and section
        const [titles] = await pool.query(
            `SELECT * FROM titles 
             WHERE course_code = ? 
             AND grade_id = ? 
             AND semester_id = ? 
             AND section_id = ?
            AND end_time > NOW()
            AND start_time > NOW()`,
            [courseCode, grade, semester, section]
        );

        // Render the course page and pass courseDetails and titles to the template
        res.render('course', { courseDetails: courseDetails[0], titles, uname });
    } catch (error) {
        console.error('Error fetching course details or titles:', error);
        res.status(500).send('Internal Server Error');
    }
});
// POST route to handle secure redirection to the course page
module.exports = route;
