const Lesson = require('./Lesson');
const Notes = require('./Notes');

Notes.belongsTo(Lesson, {
    foreignKey: 'id'
});

module.exports = { Lesson, Project };