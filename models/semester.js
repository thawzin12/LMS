const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Semester extends Model { }

Semester.init({
    semester_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    semester_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    sequelize,
    modelName: 'Semester',
    tableName: 'semester',
    timestamps: false,
});

module.exports = Semester;
