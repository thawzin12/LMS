const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { isValidEmail, isValidName, isValidPassword } = require('../utilities/validation');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const { Teacher, Student } = require('../models');
const check = require('../utilities/custommiddleware');

// Route to render the admin home page with dashboard data
router.get('/adminhome', check.ensureAdminAuthenticated, async (req, res) => {
    try {
        // Count total teachers
        const teacherCount = await Teacher.count();

        // Count students for each year by semester
        const firstYearSemester1Students = await Student.count({ where: { grade_id: 1, semester_id: 1 } });
        const firstYearSemester2Students = await Student.count({ where: { grade_id: 1, semester_id: 2 } });

        const secondYearSemester1Students = await Student.count({ where: { grade_id: 2, semester_id: 1 } });
        const secondYearSemester2Students = await Student.count({ where: { grade_id: 2, semester_id: 2 } });

        const thirdYearSemester1Students = await Student.count({ where: { grade_id: 3, semester_id: 1 } });
        const thirdYearSemester2Students = await Student.count({ where: { grade_id: 3, semester_id: 2 } });

        const fourthYearSemester1Students = await Student.count({ where: { grade_id: 4, semester_id: 1 } });
        const fourthYearSemester2Students = await Student.count({ where: { grade_id: 4, semester_id: 2 } });

        const fifthYearSemester1Students = await Student.count({ where: { grade_id: 5, semester_id: 1 } });
        const fifthYearSemester2Students = await Student.count({ where: { grade_id: 5, semester_id: 2 } });

        // Render the admin home page with all the counts
        res.render('adminhome', {
            teacherCount,
            firstYearSemester1Students,
            firstYearSemester2Students,
            secondYearSemester1Students,
            secondYearSemester2Students,
            thirdYearSemester1Students,
            thirdYearSemester2Students,
            fourthYearSemester1Students,
            fourthYearSemester2Students,
            fifthYearSemester1Students,
            fifthYearSemester2Students
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/adminprofilechange', async (req, res) => {
    const { email, name, schoolname } = req.body;
    var adminId = req.session.adminId;
    let reg = /([A-Za-z0-9])\@gmail.com/;
    namepattern = /^[a-zA-Z\s]+$/;

    var errors = {};
    var success = {};

    if (!email) {
        errors.email = 'Email is required';
    }
    if (!name) {
        errors.name = 'Name is required';
    }

    if (!namepattern.test(name)) {
        errors.name = 'name is invalid';
    }
    if (!schoolname) {
        errors.schoolname = 'School Name is required';
    }
    if (!namepattern.test(schoolname)) {
        errors.schoolname = 'school Name is invalid';
    }
    // if (!age) {
    //     errors.age = 'this field must be filled'
    // }

    else if (!isValidEmail(email) || !reg.test(email)) {
        errors.email = 'Invalid email format';
    }

    if (Object.keys(errors).length > 0) {
        res.render('adminupdatepassword', { data: req.body, errors, success });
        return;
    } else {
        try {
            var connection = req.app.get('db');
            const [existingUsers] =
                await connection.execute('UPDATE admin SET email=?,name=?,school_name=? WHERE admin_id= ?', [email, name, schoolname, adminId]);
            success.admininfo = 'Admin Information Change Successfully';
            res.render('adminupdatepassword', { data: {}, errors, success });

        }
        catch (error) {
            console.error('Error:', error);
            errors.general = 'Error creating user';
        }
    }


});

//start of forgetpassword section

router.get('/adminupdatepassword', check.ensureAdminAuthenticated, (req, res) => {
    res.render('adminupdatepassword', { data: {}, errors: {}, success: {} });
});

router.post('/adminupdatepassword', check.ensureAdminAuthenticated, async (req, res) => {
    var errors = {};
    var success = {}; // Initialize the success object
    try {
        const { currentPassword, newPassword, retypePassword } = req.body;
        var id = req.session.adminId;
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
            res.render('adminupdatepassword', { data: req.body, errors, success, eget });
        }

        if (newPassword === retypePassword) {
            checknr = true;
        } else {
            checknr = false;
            errors.retype = "New password and confirm password do not match";
        }

        var db = req.app.get('db');
        const selectQuery = 'SELECT * FROM admin WHERE admin_id = ?';
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
            const updateQuery = 'UPDATE admin SET password = ? WHERE admin_id = ?';
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
        res.render('adminupdatepassword', { data: req.body, errors, success, eget });
    } else {
        res.render('adminupdatepassword', { data: {}, errors, success, eget });
    }
});


router.post('/deletefeedback/:fid', check.ensureAdminAuthenticated, async (req, res) => {
    const { fid } = req.params;
    try {
        var pool = req.app.get('db');
        var query = 'DELETE FROM feedback WHERE fid=?';
        const result = pool.query(query, [fid]);
        res.redirect('/admin/viewfeedback?successMessage=Feedback successfully deleted');
    } catch (error) {
        console.error('Error deleting student:', error);
        res.redirect('/admin/view-students?errorMessage=Failed to delete student account');
    }
});


router.get('/viewfeedback', async (req, res) => {
    const successMessage = req.query.successMessage || null;
    var connection = req.app.get('db');
    var feedback = await connection.query('SELECT * FROM feedback');
    console.log(feedback);
    res.render('view-feedback', { feedback, successMessage });
});

module.exports = router;
