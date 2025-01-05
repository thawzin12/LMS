const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Teacher extends Model { }



// Define associations

Teacher.init({
    teacher_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Teacher',
    tableName: 'teachers',
    timestamps: false,
});


// Teacher.belongsTo(Grade, { foreignKey: 'grade_id' });

module.exports = Teacher;
