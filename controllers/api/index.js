const router = require('express').Router();
const lessonRoutes = require('./lessonRoutes');
const notesRoutes = require('./notesRoutes');
const userRoutes = require('./userRoutes')

router.use('/lessons', lessonRoutes);
router.use('/notes', notesRoutes);
router.use('/users', userRoutes);


module.exports = router;