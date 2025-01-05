const Sequelize = require('sequelize');
const sequelize = require('../config/database');
// Import models
const Teacher = require('./teacher');
const Grade = require('./grade');
const Semester = require('./semester');
const Section = require('./section');
const Course = require('./course');
const Taught = require('./taught');
const Student = require('./student');

// Make sure all models are valid Sequelize models
if (!(Teacher.prototype instanceof Sequelize.Model)) console.error('Teacher is not a Sequelize Model');
if (!(Grade.prototype instanceof Sequelize.Model)) console.error('Grade is not a Sequelize Model');
if (!(Semester.prototype instanceof Sequelize.Model)) console.error('Semester is not a Sequelize Model');
if (!(Section.prototype instanceof Sequelize.Model)) console.error('Section is not a Sequelize Model');
if (!(Course.prototype instanceof Sequelize.Model)) console.error('Course is not a Sequelize Model');
if (!(Taught.prototype instanceof Sequelize.Model)) console.error('Taught is not a Sequelize Model');
if (!(Student.prototype instanceof Sequelize.Model)) console.error('Student is not a Sequelize Model');
// In course.js (or wherever your Course model is defined)
/*
Course.belongsTo(Section, { foreignKey: 'section_id' });

// Ensure inverse associations if necessary

Section.hasMany(Course, { foreignKey: 'section_id' });
*/
// Similar associations should be established in other models as necessary



// Define associations
Grade.hasMany(Course, { foreignKey: 'grade_id' });
Semester.hasMany(Course, { foreignKey: 'semester_id' });
Course.belongsTo(Grade, { foreignKey: 'grade_id' });
Course.belongsTo(Semester, { foreignKey: 'semester_id' });

Grade.hasMany(Taught, { foreignKey: 'grade_id' });
Semester.hasMany(Taught, { foreignKey: 'semester_id' });
Section.hasMany(Taught, { foreignKey: 'section_id' });
Course.hasMany(Taught, { foreignKey: 'course_code', sourceKey: 'course_code' });

Taught.belongsTo(Grade, { foreignKey: 'grade_id' });
Taught.belongsTo(Semester, { foreignKey: 'semester_id' });
Taught.belongsTo(Section, { foreignKey: 'section_id' });
Taught.belongsTo(Course, { foreignKey: 'course_code', targetKey: 'course_code' });


//for student
Teacher.hasMany(Taught, { foreignKey: 'teacher_id' });
Taught.belongsTo(Teacher, { foreignKey: 'teacher_id' });  // Add this line for the reverse association

Grade.hasMany(Student, { foreignKey: 'grade_id' });
Semester.hasMany(Student, { foreignKey: 'semester_id' });
Section.hasMany(Student, { foreignKey: 'section_id' });

Student.belongsTo(Grade, { foreignKey: 'grade_id' });
Student.belongsTo(Semester, { foreignKey: 'semester_id' });
Student.belongsTo(Section, { foreignKey: 'section_id' });
Teacher.hasMany(Taught, { foreignKey: 'teacher_id' }); // Add this association
module.exports = {
    sequelize,
    Sequelize,
    Teacher,
    Grade,
    Semester,
    Section,
    Course,
    Taught,
    Student,
};
