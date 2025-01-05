const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Section extends Model { }

Section.init({
    section_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    section_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    sequelize,
    modelName: 'Section',
    tableName: 'sections',
    timestamps: false,
});

module.exports = Section;
