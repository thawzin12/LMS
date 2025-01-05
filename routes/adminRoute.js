const express = require('express');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const check = require('../utilities/custommiddleware');
const { Teacher, Grade, Semester, Course, Section, Taught } = require('../models');

// Display form to assign a duty to a teacher
router.get('/assign-duty', check.ensureAdminAuthenticated, async (req, res) => {
    try {
        const teachers = await Teacher.findAll();
        const grades = await Grade.findAll();
        const semesters = await Semester.findAll();
        const sections = await Section.findAll(); // Fetch sections data

        const successMessage = req.query.success;
        const errorMessage = req.query.error;
        const errors = req.session.errors || {};

        req.session.errors = {}; // Clear errors after rendering

        res.render('assign-duty', { teachers, grades, semesters, sections, successMessage, errorMessage, errors });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Handle form submission for assigning duty
router.post('/assign-duty', check.ensureAdminAuthenticated, async (req, res) => {
    const { teacher_id, grade_id, semester_id, course_code, section_ids } = req.body;

    const errors = {};

    if (!teacher_id) errors.teacher_id = 'This field is required';
    if (!grade_id) errors.grade_id = 'This field is required';
    if (!semester_id) errors.semester_id = 'This field is required';
    if (!course_code) errors.course_code = 'This field is required';
    if (!section_ids || (Array.isArray(section_ids) && section_ids.length === 0)) errors.section_ids = 'Please select at least one section';

    if (Object.keys(errors).length > 0) {
        req.session.errors = errors;
        return res.redirect('/admin/assign-duty');
    }

    try {
        const existingEntry = await Taught.findOne({
            where: {
                teacher_id,
                grade_id,
                semester_id,
                course_code,
                section_id: section_ids // Assuming one section is selected; adjust if multiple sections are handled differently
            }
        });

        if (!existingEntry) {
            for (const section_id of section_ids) {
                await Taught.create({
                    teacher_id,
                    grade_id,
                    semester_id,
                    course_code,
                    section_id
                });
            }
            res.redirect('/admin/assign-duty?success=Duty successfully assigned');
        } else {
            res.redirect('/admin/assign-duty?error=Duty assignment already exists');
        }
    } catch (error) {
        console.error('Error assigning duty:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/get-courses', check.ensureAdminAuthenticated, async (req, res) => {
    const { grade_id, semester_id } = req.query;

    try {
        const courses = await Course.findAll({
            where: {
                grade_id: grade_id,
                semester_id: semester_id
            }
        });

        res.json({ courses });
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ error: 'Failed to load courses' });
    }
});



//start manage duty
router.get('/view-teachers', check.ensureAdminAuthenticated, async (req, res) => {
    const successMessage = req.query.success || null;
    const errorMessage = req.query.error || null;

    try {
        const teachers = await Teacher.findAll({
            include: [{
                model: Taught,
                include: [Grade, Semester, Section, Course]
            }]
        });

        res.render('view-teachers', { teachers, successMessage, errorMessage });
    } catch (error) {
        console.error('Error fetching teachers:', error);
        res.status(500).send('Internal Server Error');
    }
});


// Display details of a teacher's assignments
router.get('/teacher-details/:teacher_id', check.ensureAdminAuthenticated, async (req, res) => {
    const { teacher_id } = req.params;
    const success = req.query.success || null;
    const error = req.query.error || null;


    try {
        const teacher = await Teacher.findByPk(teacher_id, {
            include: [{
                model: Taught,
                include: [Grade, Semester, Section, Course]
            }]
        });

        if (!teacher) {
            return res.status(404).send('Teacher not found');
        }

        res.render('teacher-details', { teacher, success, error });
    } catch (error) {
        console.error('Error fetching teacher details:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/delete-teacher/:teacher_id', check.ensureAdminAuthenticated, async (req, res) => {
    const { teacher_id } = req.params;

    try {
        // Find and delete the teacher
        const teacher = await Teacher.findByPk(teacher_id);

        if (teacher) {
            // Optionally, delete related entries in Taught or other tables
            await Taught.destroy({
                where: { teacher_id }
            });

            await teacher.destroy();
            res.redirect('/admin/view-teachers?success=Teacher successfully deleted');
        } else {
            res.redirect('/admin/view-teachers?error=Teacher not found');
        }
    } catch (error) {
        console.error('Error deleting teacher:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Handle updating teacher duties
router.post('/update-duty/:id', check.ensureAdminAuthenticated, async (req, res) => {
    const { id } = req.params;
    const { grade_id, semester_id, section_id, course_code } = req.body;

    try {
        const entry = await Taught.findOne({ where: { id } });
        if (entry) {
            await entry.update({ grade_id, semester_id, section_id, course_code });
            res.redirect('/admin/view-teachers?success=Duty updated successfully');
        } else {
            res.redirect('/admin/view-teachers?error=Duty not found');
        }
    } catch (error) {
        console.error('Error updating duty:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Handle updating a duty
router.post('/update-duty/:id', check.ensureAdminAuthenticated, async (req, res) => {
    const { id } = req.params;
    const { grade_id, semester_id, section_id, course_code } = req.body;

    try {
        const entry = await Taught.findOne({ where: { id } });
        if (entry) {
            await entry.update({ grade_id, semester_id, section_id, course_code });
            res.redirect(`/admin/teacher-details/${entry.teacher_id}?success=Duty updated successfully`);
        } else {
            res.redirect(`/admin/teacher-details/${entry.teacher_id}?error=Duty not found`);
        }
    } catch (error) {
        console.error('Error updating duty:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Handle deleting a duty
router.post('/delete-duty/:id', check.ensureAdminAuthenticated, async (req, res) => {
    const { id } = req.params;

    try {
        const entry = await Taught.findOne({ where: { id } });
        if (entry) {
            await entry.destroy();
            res.redirect(`/admin/teacher-details/${entry.teacher_id}?success=Duty deleted successfully`);
        } else {
            res.redirect(`/admin/teacher-details/${entry.teacher_id}?error=Duty not found`);
        }
    } catch (error) {
        console.error('Error deleting duty:', error);
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router;
