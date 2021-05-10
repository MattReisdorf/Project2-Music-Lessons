const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Note extends Model {}

Note.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        first_note: {
            type: DataTypes.STRING,
            allowNull: false
        },
        second_note: {
            type: DataTypes.STRING,
            allowNull: false
        },
        third_note: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fourth_note: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fifth_note: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sixth_note: {
            type: DataTypes.STRING,
            allowNull: false
        },
        seventh_note: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lesson_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'lesson',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'notes',
    }
);

module.exports = Notes;