const express = require('express');
const router = express.Router();
const check = require('../utilities/custommiddleware');
const { Course, Grade, Semester, Taught } = require('../models');

// Route to render the form to create a new course
router.get('/create-course', check.ensureAdminAuthenticated, async (req, res) => {
    try {
        const grades = await Grade.findAll();
        const semesters = await Semester.findAll();
        res.render('create-course', { grades, semesters, error: null, success: null });
    } catch (error) {
        console.error('Error fetching grades and semesters:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to handle course creation
router.post('/create-course', check.ensureAdminAuthenticated, async (req, res) => {
    const { course_code, course_name, grade_name, semester_name } = req.body;

    try {
        const grades = await Grade.findAll();
        const semesters = await Semester.findAll();

        // Retrieve grade and semester IDs based on the provided names
        const grade = await Grade.findOne({ where: { grade_name } });
        const semester = await Semester.findOne({ where: { semester_name } });

        if (!grade || !semester) {
            return res.render('create-course', {
                grades,
                semesters,
                error: 'Invalid grade or semester selected.',
                success: null
            });
        }

        const grade_id = grade.grade_id;
        const semester_id = semester.semester_id;

        // First Step: Check if the course_code already exists
        const existingCourseByCode = await Course.findOne({
            where: { course_code },
        });

        if (existingCourseByCode) {
            return res.render('create-course', {
                grades,
                semesters,
                error: `Course with code ${course_code} already exists. Please choose a different course code.`,
                success: null
            });
        }

        // Second Step: Check if the combination of course_name, grade_id, and semester_id already exists
        const existingCourse = await Course.findOne({
            where: { course_name, grade_id, semester_id },
        });

        if (existingCourse) {
            return res.render('create-course', {
                grades,
                semesters,
                error: `Course with the name "${course_name}" already exists in the grade "${grade_name}" for the semester "${semester_name}".`,
                success: null
            });
        }

        // If both checks pass, create the new course
        await Course.create({ course_code, course_name, grade_id, semester_id });

        return res.render('create-course', {
            grades,
            semesters,
            success: 'Course created successfully!',
            error: null
        });

    } catch (error) {
        console.error('Error creating course:', error);
        return res.status(500).render('create-course', {
            grades,
            semesters,
            error: 'Internal Server Error. Please try again later.',
            success: null
        });
    }
});

// Route to display all courses
router.get('/courses', check.ensureAdminAuthenticated, async (req, res) => {
    try {
        const courses = await Course.findAll({
            include: [
                { model: Grade, attributes: ['grade_name'] },
                { model: Semester, attributes: ['semester_name'] },
            ],
        });
        res.render('courses', { courses });
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Internal Server Error');
    }
});
router.post('/courses/delete/:course_code', check.ensureAdminAuthenticated, async (req, res) => {
    const { course_code } = req.params;

    try {
        // Delete associated records in the 'taught' table first
        await Taught.destroy({ where: { course_code } });

        // Delete the course from the 'courses' table
        await Course.destroy({ where: { course_code } });

        res.redirect('/admin/courses');
    } catch (error) {
        console.error('Error deleting course and associated duties:', error);
        res.status(500).send('Internal Server Error');
    }
});
module.exports = router;
