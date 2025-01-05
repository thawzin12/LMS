const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Grade extends Model { }

Grade.init({
    grade_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    grade_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    sequelize,
    modelName: 'Grade',
    tableName: 'grades',
    timestamps: false,
});

module.exports = Grade;
