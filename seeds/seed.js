const sequelize = require('../config/connection');
const { Notes, Lesson } = require('../models');

const notesData = require('./notesData.json');
const lessonData = require('./lessonData.json')

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const notes = await Lesson.bulkCreate(notesData, {
        individualHooks: false,
        returning: true,
    });

    for (const lesson of lessonData) {
        await Lesson.create({
            ...lesson,

        });
    }

    process.exit(0);
}

seedDatabase();