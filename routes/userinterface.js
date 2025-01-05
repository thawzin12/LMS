const express = require('express');
const router = express.Router();
const check = require('../utilities/custommiddleware');
const bcrypt = require('bcrypt');

//function isAdmin(req, res, next) {

//     if (req.session.user.isAdmin != 1) {
//         return next();
//     }
//     res.redirect('notadmin');
// }
function generateSessionId() {
    const uuid = require('uuid');
    return uuid.v4();
}


router.get('/about', check.ensureStudentAuthenticated, (req, res) => {
    var qemail = req.session.email;
    var uname = req.session.username;
    res.render('about', { uname });
});

router.get('/feedback', check.ensureStudentAuthenticated, (req, res) => {
    var qemail = req.session.email;
    var uname = req.session.username;
    res.render('submit', { data: {}, uname });
});

function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let ampm = hours >= 12 ? 'pm' : 'am';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    let strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    return strTime;
}

// Example usage:
// Output: "10:07:55 pm"


router.post('/feedback', check.ensureStudentAuthenticated, async (req, res) => {
    const { category, message } = req.body;
    var qemail = req.session.email;
    var uname = req.session.username;
    var connection = req.app.get('db');
    const now = new Date();
    // const formattedDate = formatTime(now);
    // console.log(formattedDate);
    var placeholder = 'INSERT INTO feedback (feedbackcategory,feedback, name,feedback_date) VALUES (?, ?, ?,?)';
    await connection.execute(placeholder, [category || null, message || null, uname || null, now]);
    var data;
    res.render('submit', { data: { mess: "feedback send successful!" }, uname });

});


router.get('/successful', check.ensureStudentAuthenticated, (req, res) => {
    res.render('successful');
})

router.get('/updatepassword', check.ensureStudentAuthenticated, (req, res) => {
    res.render('updatepassword', { data: {}, errors: {} });
});

router.post('/updatepassword', check.ensureStudentAuthenticated, async (req, res) => {
    var errors = {};
    try {
        const { currentPassword, newPassword, retypePassword } = req.body;
        console.log('request body for group password change', req.body);
        var checknr;
        var id = req.session.studentId;
        var eget = req.session.email;
        console.log('student session from id in update ', id);
        console.log('student email from session', eget);
        if (newPassword === retypePassword) {
            checknr = true;
        }
        else {
            checknr = false;
            errors.retype = "new password with confirm password do not match";
        }
        var db = req.app.get('db');
        const selectQuery = 'SELECT * FROM students WHERE student_id = ?';
        const [user] = await db.query(selectQuery, [id]);
        console.log('main', [user]);
        const hashedPasswordInDatabase = user[0].password;
        console.log('new', newPassword);
        console.log('retype', retypePassword);
        console.log('hashedpass', hashedPasswordInDatabase);
        // Compare the entered current password with the hashed password from the database
        const passwordMatch = await bcrypt.compare(currentPassword, hashedPasswordInDatabase);
        if (passwordMatch === false) {
            errors.current = 'current password is wrong';
        }
        if (passwordMatch && newPassword === retypePassword) {

            // Passwords match, proceed to update the password
            const newHashedPassword = await bcrypt.hash(newPassword, 10);
            // Update the user's record in the database with the new hashed password
            const updateQuery = 'UPDATE students SET password = ? WHERE student_id = ?';
            await db.query(updateQuery, [newHashedPassword, id]);
            console.log('success');
            res.render('successful');
        }
    } catch (error) {
        console.error('Password update error:', error);
        res.status(500).send('Error during password update');
    }
    if (Object.keys(errors).length > 0) {
        res.render('updatepassword', { data: req.body, errors, eget });
        return;
    }
});
module.exports = router;