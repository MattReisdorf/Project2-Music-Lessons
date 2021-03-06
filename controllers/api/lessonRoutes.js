const router = require('express').Router();
const { Lesson, Notes } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        console.log(req.session);
        const lessonData = await Lesson.findAll({
            include: {
                model: Notes,
                attributes: ['id',
                            'note_0',
                            'note_1',
                            'note_2',
                            'note_3',
                            'note_4',
                            'note_5',
                            'note_6',
                            'lesson_id']
            }
        });
        console.log(lessonData);

        res.status(200).json(lessonData);
    }
    catch (err) {
        res.status(500).json(err);
    }
});


router.get('/:id', async (req, res) => {
    try {
        const lessonData = await Lesson.findByPk(req.params.id, {
            include: {
                model: Notes,
                attributes: ['id',
                            'note_0',
                            'note_1',
                            'note_2',
                            'note_3',
                            'note_4',
                            'note_5',
                            'note_6',
                            'lesson_id']
            }
        });

        if (!lessonData) {
            res.status(404).json({ message: "No Lesson Found With This ID "});
        };

        res.status(200).json(lessonData);
    }

    catch (err) {
        res.status(500).json(err);
    }
});


router.post('/', async (req, res) => {

    try{
        console.log(req.session);
        const lessonData = await Lesson.create({
            ...req.body,
        user_id: req.session.user_id})

        const notesData = await Notes.create({
            ...req.body,
            lesson_id: lessonData.id
        })
        res.status(200).json({ lessonData })
    }
    catch (err) {
        res.status(500).json(err);
    }
});





module.exports = router;