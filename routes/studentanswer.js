const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const check = require('../utilities/custommiddleware');

router.use(bodyParser.urlencoded({ extended: true }));

// Initialize the database connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Thaw@#245',
    database: 'userdatabase',
});

// Function to get questions by title ID
async function getQuestionsByTitleId(titleId) {
    const [rows] = await pool.query(`
        SELECT q.question_id, q.question_text, c.choice_id, c.choice_text
        FROM questions q
        JOIN choices c ON q.question_id = c.question_id
        WHERE q.title_id = ?
    `, [titleId]);

    // Transform the rows into the structure you need
    const questions = rows.reduce((acc, row) => {
        let question = acc.find(q => q.question_id === row.question_id);
        if (!question) {
            question = {
                question_id: row.question_id,
                question_text: row.question_text,
                choices: []
            };
            acc.push(question);
        }
        question.choices.push({
            choice_id: row.choice_id,
            choice_text: row.choice_text
        });
        return acc;
    }, []);

    return questions;
}

router.post('/title', check.ensureStudentAuthenticated, async (req, res) => {
    try {
        const titleId = req.body.title_id;
        const uname = req.session.username;
        const studentId = req.session.studentId;
        var courseCode = req.session.courseCode;
        console.log('This is course code from the title', courseCode);

        // Check if the student has already completed this quiz
        const [existingResult] = await pool.query(`
            SELECT * FROM quiz_results
            WHERE student_id = ? AND title_id = ?
        `, [studentId, titleId]);

        if (existingResult.length > 0) {
            console.log('this is the course code from the existing', courseCode);
            return res.render('quiz-completed', { courseCode });
        }

        // Fetch the title based on the title ID
        const [titleRows] = await pool.query('SELECT * FROM titles WHERE title_id = ?', [titleId]);
        const title = titleRows[0];  // Assuming the title exists and is unique

        if (!title) {
            return res.status(404).send('Title not found');
        }

        const durationTime = title.answer_time || 600;
        const randomOrder = title.random_order;

        let questions = await getQuestionsByTitleId(titleId);

        if (randomOrder === 1) {
            questions = shuffleArray(questions);
            questions.forEach(question => {
                question.choices = shuffleArray(question.choices);
            });
        }
        const totalQuestions = questions.length;
        res.render('quiz', { questions, title, durationTime, totalQuestions, uname });
    } catch (error) {
        console.error('Error fetching quiz data:', error);
        res.status(500).send('Internal Server Error');
    }
});


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

router.post('/submit-quiz/:titleId', check.ensureStudentAuthenticated, async (req, res) => {
    const { titleId } = req.params;
    const studentId = req.session.studentId;
    let totalMarks = 0;
    const studentAnswers = [];

    try {
        const startTime = parseInt(req.body.startTime, 10);
        if (isNaN(startTime)) {
            throw new Error('Invalid start time');
        }
        const endTime = Date.now();
        const duration = Math.floor((endTime - startTime) / 1000);

        // Fetch the correct answers and all choices for this quiz
        const [questions] = await pool.query(`
            SELECT q.question_id, q.question_text, q.marks, c.choice_id, c.choice_text, c.is_correct
            FROM questions q
            JOIN choices c ON q.question_id = c.question_id
            WHERE q.title_id = ?
        `, [titleId]);

        const questionsMap = new Map();
        questions.forEach(question => {
            if (!questionsMap.has(question.question_id)) {
                questionsMap.set(question.question_id, {
                    question_text: question.question_text,
                    correct_choice_id: null,
                    correct_choice_text: null,
                    marks: question.marks,
                    choices: []
                });
            }
            const questionData = questionsMap.get(question.question_id);
            questionData.choices.push({
                choice_id: question.choice_id,
                choice_text: question.choice_text,
                is_correct: question.is_correct
            });

            if (question.is_correct) {
                questionData.correct_choice_id = question.choice_id;
                questionData.correct_choice_text = question.choice_text;
            }
        });

        // Process each answer
        for (const [question_id, choice_id] of Object.entries(req.body)) {
            if (question_id.startsWith('question_')) {
                const questionId = parseInt(question_id.split('_')[1], 10);
                const choiceId = parseInt(choice_id, 10);
                const questionData = questionsMap.get(questionId);
                const selectedChoice = questionData.choices.find(choice => choice.choice_id === choiceId);

                // Save student answer
                await pool.query(`
                    INSERT INTO student_answers (student_id, question_id, choice_id, title_id)
                    VALUES (?, ?, ?, ?)
                `, [studentId, questionId, choiceId, titleId]);

                const studentAnswer = {
                    question_text: questionData.question_text,
                    selected_choice_id: choiceId,
                    selected_choice_text: selectedChoice.choice_text,
                    correct_choice_id: questionData.correct_choice_id,
                    correct_choice_text: questionData.correct_choice_text,
                    marks_awarded: questionData.correct_choice_id === choiceId ? questionData.marks : 0
                };
                studentAnswers.push(studentAnswer);

                if (questionData.correct_choice_id === choiceId) {
                    totalMarks += questionData.marks;
                }
            }
        }

        // Save total marks and duration
        await pool.query(`
            INSERT INTO quiz_results (student_id, title_id, total_marks, duration)
            VALUES (?, ?, ?, ?)
        `, [studentId, titleId, totalMarks, duration]);

        res.render('quiz-result', {
            totalMarks,
            duration,
            studentAnswers
        });
    } catch (error) {
        console.error('Error submitting quiz:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).send('You have already completed this quiz.');
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
});

// Route to display quiz results
router.get('/quiz-result', check.ensureStudentAuthenticated, (req, res) => {
    const { totalMarks, duration } = req.query;

    if (!totalMarks || !duration) {
        return res.status(400).send('Invalid query parameters');
    }

    res.render('quiz-result', {
        totalMarks: parseInt(totalMarks, 10),
        duration: parseInt(duration, 10),
    });
});

module.exports = router;
