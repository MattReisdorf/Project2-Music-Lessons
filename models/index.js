const Lesson = require('./Lesson');
const Notes = require('./Notes');
const User = require('./User');

Lesson.hasOne(Notes, {
    foreignKey: 'lesson_id',
    onDelete: 'CASCADE'
});

Notes.belongsTo(Lesson, {
    foreignKey: 'lesson_id'
});

User.hasMany(Notes, {
    foreignKey: 'user_id'
});

User.hasMany(Lesson, {
    foreignKey: 'user_id'
});



module.exports = { Lesson, Notes };