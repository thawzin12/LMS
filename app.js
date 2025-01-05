const express = require('express');
const session = require('express-session');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const path = require('path');
const uuid = require('uuid');
const app = express();
app.use(session({
    genid: (req) => uuid.v4(),
    secret: uuid.v4(),
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000000 * 1000,
    }
}));
const dotenv = require('dotenv');
const fs = require('fs');
var caculate = require('./caculator');
//admindashboardpage
const adminhome = require('./routes/adminhomeroute');
app.use('/admin', adminhome);

//admin route of function
const createteacher = require('./routes/adminperformteacher');
app.use('/admin', createteacher);


const admincreatestudent = require('./routes/admincreatestudent');
app.use('/admin', admincreatestudent);

// for assignment duty
const adminassignduty = require('./routes/adminRoute');
app.use('/admin', adminassignduty);


//for student
const adminstudentroute = require('./routes/adminstudentRoute');
app.use('/admin', adminstudentroute);



const adminCourseRouter = require('./routes/adminCourse');
app.use('/admin', adminCourseRouter);

//end of admin rout of function
const dashboardRoute = require('./routes/dashboardRoute');
const Manner = require('./routes/forgetpasswordhandling');
const questions = require('./routes/questionroute');
const Router = require('./routes/route');
const userinterface = require('./routes/userinterface');
const teacherroute = require('./routes/teacherroute');
const studentroute = require('./routes/studentroute');
const mysql2 = require('mysql2/promise');
const bcrypt = require('bcrypt');
const ejs = require('ejs');
app.set('view engine', 'ejs');//embedded javascript for rendering dynamic web page
const studentanswer = require('./routes/studentanswer');
app.use('/', studentanswer);
//viewengine is a folder name
let hashed;
var hashPassword;
dotenv.config();
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: true }));

app.use('/', Router);
app.use('/', Manner);
app.use('/', dashboardRoute);
app.use('/', userinterface);
app.use('/', questions);
app.use('/', teacherroute);
app.use('/', studentroute);
app.get('/', (req, res) => {
    res.render('index'); // Replace 'index' with the name of your main page file (without .ejs)
});

app.set('views', path.join(__dirname, 'ejsfolder'));
app.use('/static', express.static(path.join(__dirname, 'public')));//for imag

app.listen(4500, () => {
    console.log('herher');
    console.log(`server is listening at 4000`);
})

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'Thaw@#245',
    database: 'userdatabase',
};
var pool;
try {
    pool = mysql2.createPool(dbConfig);
}

catch (err) {
    console.log(err);
}

app.use((req, res, next) => {
    req.pool = dbConfig;    //attach the database pool
    next();
})
app.set('db', pool);


const checkTeacher = (req, res, next) => {
    // Example middleware to check if user is a teacher
    // Implement actual authentication and role check
    if (req.session.isTeacher) {
        next();
    } else {
        res.redirect('/login');
    }
};

// Middleware to check if user is a student
const checkStudent = (req, res, next) => {
    // Example middleware to check if user is a student
    // Implement actual authentication and role check
    if (req.session.isStudent) {
        next();
    } else {
        res.redirect('/login');
    }
};

















// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'thawhtet077@gmail.com',
//         pass: 'wozp txvm ovgy rvdf'
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
// });

// var mailOptions = {
//     from: 'thawhtet077@gmail.com',
//     to: 'ayeayephyo205@gmail.com',
//     subject: 'lovely',
//     text: 'I love you'
// };

// transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Email sent: ' + info.response);
//     }
// });

// app.get('/a', (req, res) => {
//     console.log('server is requested');
//     res.sendFile(__dirname + "/login.html");
// });

// app.get('/hom', (req, res) => {
//     const num1 = Number(req.body.num1);
//     const num2 = Number(req.body.num2);
//     const result = caculate.caculateResult(num1, num2);
//     console.log(result);
//     const htmlfilepath = path.join(__dirname, 'public', 'home.html');
//     const giveresponseFile = fs.readFileSync(htmlfilepath, 'utf-8')
//     const updateGive = giveresponseFile.replace('{{result}}', result);
//     res.send(updateGive);
// });


// Section of The database of the mind

// database section

// const mysql = require('mysql2');

// // Replace 'your_username', 'your_password', 'your_database', and 'your_host' with your MySQL credentials
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'thawzinhtet@#',
//     database: 'userdatabase'
// });

// //Connect to the database
// connection.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL:', err);
//         return;
//     }
//     console.log('Connected to MySQL database');
// });



// Verify OTP

