const express = require('express');
const router = express.Router();
const check = require('../utilities/custommiddleware');
const { Student, Grade, Semester, Section, Sequelize } = require('../models');
const { Op } = Sequelize; // Import Sequelize operators


router.get('/view-students', check.ensureAdminAuthenticated, async (req, res) => {
    const successMessage = req.query.successMessage || null;
    const errorMessage = req.query.errorMessage || null;

    try {
        const students = await Student.findAll({
            include: [
                { model: Grade, attributes: ['grade_name'] },
                { model: Semester, attributes: ['semester_name'] },
                { model: Section, attributes: ['section_name'] },
            ],
        });
        console.log('This is the student from the view student ', students.Grade);
        res.render('view-students', { students, successMessage, errorMessage });
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).send('Internal Server Error');
    }
});



// Route to delete a student account
router.post('/delete-student/:student_id', check.ensureAdminAuthenticated, async (req, res) => {
    const { student_id } = req.params;
    try {
        const student = await Student.findByPk(student_id);
        if (!student) {
            return res.redirect('/admin/view-students?errorMessage=Student not found');
        }

        await Student.destroy({ where: { student_id } });
        res.redirect('/admin/view-students?successMessage=Student account successfully deleted');
    } catch (error) {
        console.error('Error deleting student:', error);
        res.redirect('/admin/view-students?errorMessage=Failed to delete student account');
    }
});



// Route to promote student to next semester
router.post('/update-semester/:student_id', check.ensureAdminAuthenticated, async (req, res) => {
    const { student_id } = req.params;

    try {
        const student = await Student.findByPk(student_id);
        if (!student) {
            return res.redirect('/admin/view-students?errorMessage=Student not found');
        }

        // Logic to determine the next semester
        let nextSemester = await getNextSemester(student.semester_id);

        if (nextSemester) {
            await student.update({ semester_id: nextSemester.semester_id });
            res.redirect('/admin/view-students?successMessage=Student promoted to next semester');
        } else {
            res.redirect('/admin/view-students?errorMessage=Failed to promote student, no next semester found');
        }
    } catch (error) {
        console.error('Error updating semester:', error);
        res.redirect('/admin/view-students?errorMessage=Failed to update semester');
    }
});

// Function to get the next semester (you should implement this logic based on your requirements)
async function getNextSemester(currentSemesterId) {
    const semesters = await Semester.findAll({
        order: [['semester_id', 'ASC']],
    });
    const currentIndex = semesters.findIndex(s => s.semester_id === currentSemesterId);

    if (currentIndex >= 0 && currentIndex < semesters.length - 1) {
        return semesters[currentIndex + 1];
    }
    return null;
}



// Route to render the edit form
router.get('/edit-student/:student_id', check.ensureAdminAuthenticated, async (req, res) => {
    const { student_id } = req.params;
    try {
        const student = await Student.findByPk(student_id, {
            include: [
                { model: Grade, attributes: ['grade_id', 'grade_name'] },
                { model: Semester, attributes: ['semester_id', 'semester_name'] },
                { model: Section, attributes: ['section_id', 'section_name'] },
            ],
        });

        const grades = await Grade.findAll();
        const semesters = await Semester.findAll();
        const sections = await Section.findAll();

        res.render('edit-student', { student, grades, semesters, sections, errors: {} });
    } catch (error) {
        console.error('Error fetching student for editing:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to update student information (roll number, etc.)
router.post('/edit-student/:student_id', check.ensureAdminAuthenticated, async (req, res) => {
    const { student_id } = req.params;
    const { roll_number, grade_id, semester_id, section_id } = req.body;

    let errors = {};

    if (!roll_number) {
        errors.roll_number = 'Roll number is required';
    }

    // Check for unique roll number
    const existingStudent = await Student.findOne({ where: { roll_number, student_id: { [Op.ne]: student_id } } });
    if (existingStudent) {
        errors.roll_number = 'Roll number already exists. Please choose a different roll number.';
    }

    if (Object.keys(errors).length > 0) {
        const student = await Student.findByPk(student_id, {
            include: [
                { model: Grade, attributes: ['grade_id', 'grade_name'] },
                { model: Semester, attributes: ['semester_id', 'semester_name'] },
                { model: Section, attributes: ['section_id', 'section_name'] },
            ],
        });
        const grades = await Grade.findAll();
        const semesters = await Semester.findAll();
        const sections = await Section.findAll();

        res.render('edit-student', { student, grades, semesters, sections, errors });
        return;
    }

    try {
        await Student.update(
            { roll_number, grade_id, semester_id, section_id },
            { where: { student_id } }
        );
        res.redirect('/admin/view-students?successMessage=Student Information Update Successful!');
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).send('Internal Server Error');
    }
});
module.exports = router;
