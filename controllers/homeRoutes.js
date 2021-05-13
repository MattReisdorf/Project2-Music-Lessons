const router = require('express').Router();
const { Lesson, Notes } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {

    if (req.session.logged_in) {
        res.redirect('/lessons');
        return;
    }
    
    res.render('landing');
})



router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});



router.get('/signup', (req, res) => {
   if(req.session.logged_in) {
       res.redirect('/');
       return;
    }
    res.render('signup');
});


router.get('/resources', (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('resources');
})


router.get('/lessons', async (req, res) => {
    
    if (!req.session.logged_in) {
        res.redirect('/');
        return;
    }

    const lessonData = await Lesson.findAll({
        where: {
            user_id: req.session.user_id
        },
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

    const lessons = lessonData.map((lesson) => lesson.get({ plain: true}));
    console.log(lessons);
    res.render('lessons', {
        logged_in: req.session.logged_in,
        lessons
    });
});
router.get('/lessons/:lessonName', async (req, res) => {

    const lessonData = await Lesson.findAll({
        where: {
            name: req.params.lessonName
        },
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

    const lessons = lessonData.map((lesson) => lesson.get({ plain: true}));

    // console.log(lessons[0].note);

    const notesArray = new Array;

    for (const property in lessons[0].note) {
        if ((property == 'id') || (property == 'lesson_id')){
            continue;
        }
        console.log(lessons[0].note[property])
        notesArray.push(lessons[0].note[property]);
    }

    console.log(notesArray);
    // console.log(lessons);
    res.render('lessons', {
        logged_in: req.session.logged_in,
        lessons,
        notes: notesArray
    });
});


router.get('/addlesson', (req, res) => {
    res.render('addlesson', {logged_in: req.session.logged_in});
});


module.exports = router;