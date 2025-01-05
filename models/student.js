const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Student extends Model { }

Student.init({
    student_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    roll_number: {
        type: DataTypes.STRING(225),
        allowNull: false,
        unique: true,
    },
    grade_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    semester_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    section_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW,
    }
}, {
    sequelize,
    modelName: 'Student',
    tableName: 'students',
    timestamps: false,
});

// Define relationships
Student.associate = function (models) {
    Student.belongsTo(models.Grade, { foreignKey: 'grade_id' });
    Student.belongsTo(models.Semester, { foreignKey: 'semester_id' });
    Student.belongsTo(models.Section, { foreignKey: 'section_id' });
};

module.exports = Student;
