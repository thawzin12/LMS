const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Course extends Model { }

Course.init({
    course_code: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    course_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    grade_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    semester_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Course',
    tableName: 'courses',
    timestamps: false,
});
// Course.hasMany(Teacher, { foreignKey: 'course_id' });
module.exports = Course;
