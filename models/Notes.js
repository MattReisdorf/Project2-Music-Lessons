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
        note_0: {
            type: DataTypes.STRING,
            allowNull: false
        },
        note_1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        note_2: {
            type: DataTypes.STRING,
            allowNull: false
        },
        note_3: {
            type: DataTypes.STRING,
            allowNull: false
        },
        note_4: {
            type: DataTypes.STRING,
            allowNull: false
        },
        note_5: {
            type: DataTypes.STRING,
            allowNull: false
        },
        note_6: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lesson_id: {
            type: DataTypes.INTEGER,
            // allowNull: false,
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

module.exports = Note;