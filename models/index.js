const Lesson = require('./Lesson');
const Notes = require('./Notes');

Lesson.hasOne(Notes, {
    foreignKey: 'lesson_id',
    onDelete: 'CASCADE'
});

Notes.belongsTo(Lesson, {
    foreignKey: 'lesson_id'
});

module.exports = { Lesson, Notes };