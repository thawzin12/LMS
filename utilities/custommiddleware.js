function generateSessionId() {
    const uuid = require('uuid');
    return uuid.v4();
}
function userpass(req, res, next) {
    if (req.session.user) {
        next();
    }
    else {
        console.log('hello')
        res.redirect('/login');
    }
};
// Middleware for admins
const ensureAdminAuthenticated = (req, res, next) => {
    if (req.session.role === 'admin' && req.session.adminId) {
        return next();
    }
    res.redirect('/login');
};

// Middleware for students
const ensureStudentAuthenticated = (req, res, next) => {
    if (req.session.role === 'student' && req.session.studentId) {
        return next();
    }
    res.redirect('/login');
};

// Middleware for teachers
const ensureTeacherAuthenticated = (req, res, next) => {
    if (req.session.role === 'teacher' && req.session.teacherId) {
        return next();
    }
    res.redirect('/login');
};

// // Usage examples:
// // For admin routes
// app.use('/admin', ensureAdminAuthenticated);

// // For student routes
// app.use('/student', ensureStudentAuthenticated);

// // For teacher routes
// app.use('/teacher', ensureTeacherAuthenticated);

module.exports = { generateSessionId, userpass, ensureAdminAuthenticated, ensureTeacherAuthenticated, ensureStudentAuthenticated };