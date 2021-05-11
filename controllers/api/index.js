const router = require('express').Router();
const lessonRoutes = require('./lessonRoutes');
const notesRoutes = require('./notesRoutes');

router.use('/lessons', lessonRoutes);
router.use('/notes', notesRoutes);


module.exports = router;