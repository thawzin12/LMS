const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Import related models
const Grade = require('./grade');
const Semester = require('./semester');
const Section = require('./section');
const Course = require('./course');

class Taught extends Model { }
Taught.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    teacher_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    course_code: {
        type: DataTypes.STRING,
        allowNull: true, // Make nullable
    },
    grade_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    semester_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Make nullable
    },
    section_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Make nullable
    },
}, {
    sequelize,
    modelName: 'Taught',
    tableName: 'taught',
    timestamps: false,
});


// Define associations
Taught.belongsTo(Grade, { foreignKey: 'grade_id' });
Taught.belongsTo(Semester, { foreignKey: 'semester_id' });
Taught.belongsTo(Section, { foreignKey: 'section_id' });
Taught.belongsTo(Course, { foreignKey: 'course_code', targetKey: 'course_code' });

module.exports = Taught;
