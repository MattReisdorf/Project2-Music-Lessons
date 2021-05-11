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
    // let lesson_idddd = forEach(lesson.dataValues.id);
    // console.log(lesson_idddd)
    // console.log(lesson[0].dataValues.id);
    for (const note of notesData) {
        await Notes.create({
            ...note,
            // lesson_id: forEach(lesson.dataValues.id)
            
        });
        // for (let i = 0; i < lesson.length; i++) {
        //     lesson_id = lesson[i].dataValues.id;
        // }
        // for (let i = 0; l < lesson.length; i++) {
        //     console.log(lesson[i]);
        // }
        
        
    }

    process.exit(0);
}



seedDatabase();