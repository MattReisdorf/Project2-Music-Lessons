const router = require('express').Router();
const { Lesson, Notes } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async  (req, res) => {
    try{
        const lessonData = await Lesson.findAll({
            include: [
                {
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
                },
            ],
        });

        const lessons = lessonData.map((lesson) => lesson.get({ plain: true }));
        
        res.render('layouts/main', {
            lessons,
            // logged_in: req.session.logged_in
        });
    }

    catch (err) {
        res.status(500).json(err);
    }
});



router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/homepage');
        return;
    }

    res.render('login');
});




module.exports = router;