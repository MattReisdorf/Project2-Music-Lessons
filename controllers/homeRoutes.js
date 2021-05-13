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


router.get('/lessons', (req, res) => {
    res.render('lessons', {logged_in: req.session.logged_in});
});


router.get('/addlesson', (req, res) => {
    res.render('addlesson', {logged_in: req.session.logged_in});
});


module.exports = router;