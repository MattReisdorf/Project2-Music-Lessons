const router = require('express').Router();
const { Lesson, Notes } = require('../models');
const withAuth = require('../utils/auth');

// router.get('/', async  (req, res) => {
//     try{
//         const lessonData = await Lesson.findAll({
//             include: [
//                 {
//                     model: Notes,
//                     attributes: ['id',
//                                 'note_0',
//                                 'note_1',
//                                 'note_2',
//                                 'note_3',
//                                 'note_4',
//                                 'note_5',
//                                 'note_6',
//                                'lesson_id']
//                 },
//             ],
//         });

//         const lesson = lessonData.map((lesson) => lesson.get({ plain: true }));
        
//         res.render('landing', {
 //            ...lesson,
 //            logged_in: req.session.logged_in,
  //           logged_lesson: req.session.logged_lesson
   //      });
//     }

//     catch (err) {
//         res.status(500).json(err);
//     }
// });


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


router.get('/lessons', (req, res) => {
    res.render('lessons', {logged_in: req.session.logged_in});
})


module.exports = router;