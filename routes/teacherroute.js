const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { isValidEmail, isValidName, isValidPassword } = require('../utilities/validation');
const { Teacher, Grade, Semester, Course, Section, Taught } = require('../models');
const check = require('../utilities/custommiddleware');

// Middleware to ensure the user is authenticated
const ensureAuthenticated = (req, res, next) => {
    if (req.session.role === 'teacher' && req.session.teacherId) {
        return next();
    }
    res.redirect('/login');
};
router.get('/teacherupdatepassword', check.ensureTeacherAuthenticated, async (req, res) => {
    const teachername = req.session.tname;
    res.render('teacherupdatepassword', { teachername, data: {}, errors: {}, success: {} });
});

router.post('/teacherupdatepassword', check.ensureTeacherAuthenticated, async (req, res) => {
    var errors = {};
    const teachername = req.session.tname;
    var success = {}; // Initialize the success object
    try {
        const { currentPassword, newPassword, retypePassword } = req.body;
        var id = req.session.teacherId;
        var eget = req.session.email;
        if (!currentPassword) {
            errors.currentpassword = 'Current Password is required';
        } else {
            const passwordValidationResult = isValidPassword(currentPassword);
            if (passwordValidationResult.error) {
                errors.currentpassword = passwordValidationResult.error;
            }
        }
        if (!newPassword) {
            errors.newpassword = 'New Password is required';
        } else {
            const passwordValidationResult = isValidPassword(newPassword);
            if (passwordValidationResult.error) {
                errors.newpassword = passwordValidationResult.error;
            }
        }
        if (!retypePassword) {
            errors.retypepassword = 'Confirm Password is required';
        } else {
            const passwordValidationResult = isValidPassword(retypePassword);
            if (passwordValidationResult.error) {
                errors.retypepassword = passwordValidationResult.error;
            }
        }
        if (Object.keys(errors).length > 0) {
            res.render('teacherupdatepassword', { teachername, data: req.body, errors, success, eget });
        }


        if (newPassword === retypePassword) {
            checknr = true;
        } else {
            checknr = false;
            errors.retype = "New password and confirm password do not match";
        }

        var db = req.app.get('db');
        const selectQuery = 'SELECT * FROM teachers WHERE teacher_id = ?';
        const [user] = await db.query(selectQuery, [id]);
        const hashedPasswordInDatabase = user[0].password;

        // Compare the entered current password with the hashed password from the database
        const passwordMatch = await bcrypt.compare(currentPassword, hashedPasswordInDatabase);
        if (!passwordMatch) {
            errors.current = 'Current password is incorrect';
        }

        if (passwordMatch && newPassword === retypePassword) {
            // Passwords match, proceed to update the password
            const newHashedPassword = await bcrypt.hash(newPassword, 10);
            const updateQuery = 'UPDATE teachers SET password = ? WHERE teacher_id = ?';
            await db.query(updateQuery, [newHashedPassword, id]);

            // Set success message
            success.change = 'Password Changed Successfully';
        }
    } catch (error) {
        console.error('Password update error:', error);
        res.status(500).send('Error during password update');
        return; // Important to return after sending a response to prevent further execution
    }

    // Render with errors or success message
    if (Object.keys(errors).length > 0) {
        res.render('teacherupdatepassword', { teachername, data: req.body, errors, success, eget });
    } else {
        res.render('teacherupdatepassword', { teachername, data: {}, errors, success, eget });
    }
});



router.get('/post-question', ensureAuthenticated, async (req, res) => {
    const pool = req.app.get('db');
    const teachername = req.session.tname;
    const teacherId = req.session.teacherId; // Assuming teacherId is stored in the session
    console.log('this is teacherId from teacher ', teacherId);

    try {
        // Fetch grades related to the logged-in teacher
        const [grades] = await pool.query(
            `SELECT DISTINCT g.grade_id, g.grade_name 
             FROM grades g 
             JOIN taught t ON g.grade_id = t.grade_id 
             WHERE t.teacher_id = ?`,
            [teacherId]
        );

        // Ensure grades is an array (it will be empty if no grades are found)
        res.render('post-question', {
            grades: grades || [],
            message: req.query.message || null,
            error: null,
            teachername
        });
    } catch (error) {
        console.error('Error fetching data for post-question page:', error);
        res.render('post-question', {
            grades: [],
            message: null,
            error: 'Internal Server Error: Unable to fetch grades.'
        });
    }
});
router.post('/post-question', async (req, res) => {
    const pool = req.app.get('db');
    const teacherId = req.session.teacherId;
    const teachername = req.session.tname;

    const {
        grade_id,
        section_id,
        course_code,
        semester_id,
        title_name,
        start_time,
        end_time,
        answer_time,
        random_order = 0,
        questions = []
    } = req.body;

    console.log('Answer time:', answer_time);
    console.log('Random order:', random_order);

    const formattedStartTime = new Date(start_time);
    const formattedEndTime = new Date(end_time);
    const currentTime = new Date();

    let validationError = null;

    if (formattedStartTime.getTime() < currentTime.getTime()) {
        validationError = 'Start time cannot be in the past.';
    } else if (formattedEndTime.getTime() <= formattedStartTime.getTime()) {
        validationError = 'End time must be after the start time.';
    }

    if (validationError) {
        try {
            const [grades] = await pool.query(
                `SELECT DISTINCT g.grade_id, g.grade_name 
                 FROM grades g 
                 JOIN taught t ON g.grade_id = t.grade_id 
                 WHERE t.teacher_id = ?`,
                [teacherId]
            );

            return res.render('post-question', {
                message: null,
                error: validationError,
                grades: grades,
                teachername
            });
        } catch (error) {
            console.error('Error fetching grades:', error);
            return res.render('post-question', {
                message: null,
                teachername,
                error: 'Internal Server Error: Unable to fetch grades.',
                grades: []
            });
        }
    }

    const randomOrderValue = random_order === 'on' ? 1 : 0;

    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const [titleResult] = await connection.query(
            `INSERT INTO titles 
            (title_name, teacher_id, start_time, end_time, grade_id, course_code, semester_id, section_id, random_order, answer_time) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [title_name, teacherId, formattedStartTime, formattedEndTime, grade_id, course_code, semester_id, section_id, randomOrderValue, answer_time]
        );
        const title_id = titleResult.insertId;

        for (let questionIndex = 0; questionIndex < questions.length; questionIndex++) {
            const question = questions[questionIndex];
            const { text: question_text, marks, choices = [], choices_correct = {} } = question;

            if (!question_text) {
                return res.render('post-question', {
                    message: null,
                    error: 'Question text is required.',
                    grades: req.body.grades,
                    teachername
                });
            }

            const [questionResult] = await connection.query(
                'INSERT INTO questions (title_id, question_text, marks) VALUES (?, ?, ?)',
                [title_id, question_text, marks]
            );
            const question_id = questionResult.insertId;

            let correctAnswerFound = false;

            for (let i = 0; i < choices.length; i++) {
                const choiceText = choices[i];
                const correctKey = `${questionIndex + 1}_${i}`; // Adjusted key to match form structure
                let isCorrect = false;

                if (Array.isArray(choices_correct[correctKey])) {
                    isCorrect = choices_correct[correctKey].includes('true');
                } else {
                    isCorrect = choices_correct[correctKey] === 'true';
                }

                console.log(`Processing choice ${i} for question ${questionIndex + 1}:`, {
                    choiceText,
                    correctKey,
                    isCorrect,
                    choices_correct
                });

                if (isCorrect) {
                    correctAnswerFound = true;
                }

                await connection.query(
                    'INSERT INTO choices (question_id, choice_text, is_correct) VALUES (?, ?, ?)',
                    [question_id, choiceText, isCorrect ? 1 : 0]
                );
            }

            if (!correctAnswerFound) {
                throw new Error(`At least one correct answer must be selected for question ${questionIndex + 1}.`);
            }
        }

        await connection.commit();

        const [grades] = await pool.query(
            `SELECT DISTINCT g.grade_id, g.grade_name 
             FROM grades g 
             JOIN taught t ON g.grade_id = t.grade_id 
             WHERE t.teacher_id = ?`,
            [teacherId]
        );

        res.render('post-question', {
            message: 'Questions posted successfully.',
            error: null,
            grades: grades,
            teachername
        });
    } catch (error) {
        console.error('Error:', error);
        if (connection) await connection.rollback();

        const [grades] = await pool.query(
            `SELECT DISTINCT g.grade_id, g.grade_name 
             FROM grades g 
             JOIN taught t ON g.grade_id = t.grade_id 
             WHERE t.teacher_id = ?`,
            [teacherId]
        );

        res.render('post-question', {
            message: null,
            error: error.message || 'An error occurred while posting questions.',
            grades: grades, teachername
        });
    } finally {
        if (connection) connection.release();
    }
});

////////////////////
router.get('/manage-titles', async (req, res) => {
    const db = req.app.get('db');
    const success = req.query.success || null;
    const teacherId = req.session.teacherId;
    const teachername = req.session.tname;// Replace with actual user ID logic

    try {
        // Fetch active titles created by the logged-in teacher
        const [titles] = await db.query(
            'SELECT * FROM titles WHERE teacher_id = ? AND is_active = TRUE',
            [teacherId]
        );
        res.render('manage-titles', { titles, teachername, success });
    } catch (error) {
        console.error('Error fetching titles:', error);
        res.status(500).json({ message: 'An error occurred while fetching titles.' });
    }
});



// for manage titles
// GET route to render the edit form for a title

router.get('/edit-title/:id', async (req, res) => {
    const db = req.app.get('db');
    const titleId = req.params.id;
    const teachername = req.session.tname;

    try {
        // Fetch the title details
        const [title] = await db.query('SELECT * FROM titles WHERE title_id = ?', [titleId]);

        // Handle case where title is not found
        if (!title) {
            return res.status(404).send('Title not found.');
        }

        // Check if the title's start time has passed
        const currentTime = new Date();
        if (new Date(title.start_time) < currentTime) {
            return res.status(403).send('Editing is not allowed after the start time.');
        }

        // Fetch the associated questions and choices
        const [rows] = await db.query(`
            SELECT q.question_id, q.question_text, q.marks, c.choice_id, c.choice_text, c.is_correct
            FROM questions q
            LEFT JOIN choices c ON q.question_id = c.question_id
            WHERE q.title_id = ?
        `, [titleId]);

        // Structure the data to group choices by questions
        const questions = [];
        rows.forEach(row => {
            let question = questions.find(q => q.question_id === row.question_id);
            if (!question) {
                question = {
                    question_id: row.question_id,
                    question_text: row.question_text,
                    marks: row.marks,
                    choices: []
                };
                questions.push(question);
            }
            if (row.choice_id) {
                question.choices.push({
                    choice_id: row.choice_id,
                    choice_text: row.choice_text,
                    is_correct: row.is_correct
                });
            }
        });

        // Render the edit-title EJS template
        res.render('edit-title', { title: title[0], questions, teachername });
    } catch (error) {
        console.error('Error fetching title details:', error);
        res.status(500).send('Server error.');
    }
});
// POST route to handle updating a
router.post('/update-title/:id', async (req, res) => {
    const db = req.app.get('db');
    const titleId = req.params.id;
    const { title_name, questions } = req.body;

    if (!title_name || !Array.isArray(questions)) {
        return res.status(400).send('Invalid input data.');
    }

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        // Update the title
        await connection.query('UPDATE titles SET title_name = ? WHERE title_id = ?', [title_name, titleId]);

        // Fetch existing questions and choices for the title
        const [existingQuestions] = await connection.query('SELECT question_id FROM questions WHERE title_id = ?', [titleId]);
        const existingQuestionIds = new Set(existingQuestions.map(q => q.question_id));

        // Process each question
        for (let question of questions) {
            let { question_id, text, marks, choices } = question;

            if (!text || !marks || !Array.isArray(choices)) {
                throw new Error('Invalid question data.');
            }

            if (question_id && existingQuestionIds.has(question_id)) {
                // Update existing question
                await connection.query('UPDATE questions SET question_text = ?, marks = ? WHERE question_id = ?', [text, marks, question_id]);
            } else {
                // Insert new question
                const [newQuestion] = await connection.query('INSERT INTO questions (title_id, question_text, marks) VALUES (?, ?, ?)', [titleId, text, marks]);
                question_id = newQuestion.insertId;
            }

            // Fetch existing choices for the question
            const [existingChoices] = await connection.query('SELECT choice_id FROM choices WHERE question_id = ?', [question_id]);
            const existingChoiceIds = new Set(existingChoices.map(c => c.choice_id));

            // Process each choice
            for (let choice of choices) {
                let { choice_id, text, correct } = choice;
                const isCorrect = correct ? 1 : 0;

                if (!text) {
                    throw new Error('Invalid choice data.');
                }

                if (choice_id && existingChoiceIds.has(choice_id)) {
                    // Update existing choice
                    await connection.query('UPDATE choices SET choice_text = ?, is_correct = ? WHERE choice_id = ?', [text, isCorrect, choice_id]);
                } else {
                    // Insert new choice
                    await connection.query('INSERT INTO choices (question_id, choice_text, is_correct) VALUES (?, ?, ?)', [question_id, text, isCorrect]);
                }
            }
        }

        await connection.commit();
        res.redirect(`/edit-title/${titleId}?success=true`);
    } catch (error) {
        await connection.rollback();
        console.error('Error updating title:', error.message);
        res.status(500).send('Server error: ' + error.message);
    } finally {
        connection.release();
    }
});

//delete section
// POST route to handle title deletion
// GET route to handle title deletion
// GET route to handle title deletion
router.get('/delete-title/:id', async (req, res) => {
    const db = req.app.get('db');
    const titleId = req.params.id;
    const teachername = req.session.tname;

    try {
        // Begin a transaction
        await db.query('START TRANSACTION');

        // Delete related records from the history table first
        await db.query('DELETE FROM history WHERE title_id = ?', [titleId]);

        // Delete associated choices and questions
        await db.query('DELETE FROM choices WHERE question_id IN (SELECT question_id FROM questions WHERE title_id = ?)', [titleId]);
        await db.query('DELETE FROM questions WHERE title_id = ?', [titleId]);

        // Then delete the title
        await db.query('DELETE FROM titles WHERE title_id = ?', [titleId]);

        // Commit the transaction
        await db.query('COMMIT');

        res.redirect('/manage-titles?success=Title successfully deleted');
    } catch (error) {
        // Rollback the transaction in case of error
        await db.query('ROLLBACK');
        console.error('Error deleting title:', error);
        res.status(500).send('Server Error');
    }
});


// GET route to render details of a title
router.get('/title-details/:id', async (req, res) => {
    const db = req.app.get('db');
    const titleId = req.params.id;
    const teachername = req.session.tname;

    try {
        // Fetch the title and associated questions
        const [title] = await db.query('SELECT * FROM titles WHERE title_id = ?', [titleId]);
        const [questions] = await db.query('SELECT * FROM questions WHERE title_id = ?', [titleId]);

        if (title.length === 0) {
            return res.status(404).send('Title not found');
        }

        res.render('title-details', { title: title[0], questions, teachername });
    } catch (error) {
        console.error('Error fetching title details:', error);
        res.status(500).send('Server Error');
    }
});


router.get('/view-results', async (req, res) => {
    const db = req.app.get('db');
    const teacherId = req.session.teacherId; // Assuming teacherId is available in req.user

    try {
        const [results] = await db.query(`
           SELECT h.history_id, t.title_name, g.grade_name, s.name, h.marks
FROM history h
JOIN titles t ON h.title_id = t.title_id
JOIN grades g ON t.grade_id = g.grade_id
JOIN students s ON h.student_id = s.student_id
WHERE t.teacher_id = ?`, [teacherId]
        );

        res.render('view-results', { results });
    } catch (error) {
        console.error('Error fetching results:', error);
        res.status(500).send('Error fetching results.');
    }
});
/////////////////////////
router.get('/api/get-semesters/:gradeId', async (req, res) => {
    const { gradeId } = req.params;
    const pool = req.app.get('db');
    const teacherId = req.session.teacherId;

    if (!teacherId) {
        return res.status(403).send('Unauthorized access.');
    }

    try {
        const [semesters] = await pool.query(
            `SELECT DISTINCT s.*
             FROM semester s
             JOIN courses c ON s.semester_id = c.semester_id
             JOIN taught t ON c.course_code = t.course_code
             WHERE c.grade_id = ? AND t.teacher_id = ?`,
            [gradeId, teacherId]
        );

        res.json(semesters);
    } catch (error) {
        console.error('Error fetching semesters:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Get sections based on grade and semester ID
// Get sections based on grade and semester ID
router.get('/api/get-sections/:gradeId/:semesterId', async (req, res) => {
    const { gradeId, semesterId } = req.params;
    const pool = req.app.get('db');
    const teacherId = req.session.teacherId;

    if (!teacherId) {
        return res.status(403).send('Unauthorized access.');
    }

    try {
        const [sections] = await pool.query(
            `SELECT DISTINCT s.*
             FROM sections s
             JOIN taught t ON s.section_id = t.section_id
             JOIN courses c ON t.course_code = c.course_code
             WHERE c.grade_id = ? AND c.semester_id = ? AND t.teacher_id = ?`,
            [gradeId, semesterId, teacherId]
        );

        res.json(sections);
    } catch (error) {
        console.error('Error fetching sections:', error);
        res.status(500).send('Internal Server Error');
    }
});


// Get courses based on grade, semester, and section ID
router.get('/api/get-courses/:gradeId/:semesterId/:sectionId', async (req, res) => {
    const { gradeId, semesterId, sectionId } = req.params;
    const pool = req.app.get('db');
    const teacherId = req.session.teacherId;

    if (!teacherId) {
        return res.status(403).send('Unauthorized access.');
    }

    try {
        const [courses] = await pool.query(
            `SELECT DISTINCT c.*
             FROM courses c
             JOIN taught t ON c.course_code = t.course_code
             WHERE t.grade_id = ? AND t.semester_id = ? AND t.section_id = ? AND t.teacher_id = ?`,
            [gradeId, semesterId, sectionId, teacherId]
        );

        res.json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/viewgrades', check.ensureTeacherAuthenticated, async (req, res) => {
    const teacherId = req.session.teacherId;
    const pool = req.app.get('db');
    const teachername = req.session.tname;

    try {
        // Fetch titles posted by this teacher
        const [titles] = await pool.query(`
            SELECT title_id, title_name
            FROM titles
            WHERE teacher_id = ?
        `, [teacherId]);

        // Fetch students' answers and their details for the titles posted by this teacher
        const [studentAnswers] = await pool.query(`
            SELECT 
                t.title_name, 
                s.name AS student_name, 
                s.roll_number, 
                qr.total_marks, 
                g.grade_name, 
                sem.semester_name, 
                sec.section_name
            FROM quiz_results qr
            JOIN titles t ON qr.title_id = t.title_id
            JOIN students s ON qr.student_id = s.student_id
            JOIN grades g ON s.grade_id = g.grade_id
            JOIN semester sem ON s.semester_id = sem.semester_id
            JOIN sections sec ON s.section_id = sec.section_id
            WHERE t.teacher_id = ?
        `, [teacherId]);

        res.render('viewgrades', { titles, studentAnswers, teachername });
    } catch (error) {
        console.error('Error fetching titles or student answers:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;

