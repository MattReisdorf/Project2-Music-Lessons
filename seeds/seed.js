const sequelize = require('../config/connection');
const { Notes, Lesson } = require('../models');

const notesData = require('./notesData.json');
const lessonsData = require('./lessonsData.json');


const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const lesson = await Lesson.bulkCreate(lessonsData, {
        individualHooks: false,
        returning: true,
    });
    
    for (const note of notesData) {
        await Notes.create({
            ...note,
        });
    }

    process.exit(0);
}



seedDatabase();