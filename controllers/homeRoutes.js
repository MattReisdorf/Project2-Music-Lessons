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
                                'first_note',
                                'second_note',
                                'third_note',
                                'fourth_note',
                                'fifth_note',
                                'sixth_note',
                                'seventh_note',
                                'lesson_id']
                },
            ],
        });

        const lessons = lessonData.map((lesson) => lesson.get({ plain: true }));

        res.render('homepage', {
            lessons,
            logged_in: req.session.logged_in
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