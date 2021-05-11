const router = require('express').Router();
const { Lesson, Notes } = require('../../models');


router.get('/', async (req, res) => {
    try {
        const notesData = await Notes.findAll({
            include: {
                model: Lesson, 
                attributes: ['id', 'name']
            }
        });
        res.status(200).json(notesData);
    }
    
    catch (err) {
        res.status(500).json(err);
    }
});


router.get('/:id', async (req, res) => {
    try {
        const notesData = await Notes.findByPk(req.params.id, {
            include: {
                model: Lesson,
                attributes: ['id', 'name']
            }
        })

        if (!notesData) {
            res.status(404).json({ message: 'No Note Collection Found With This ID' });
        };

        res.status(200).json(notesData);
    }

    catch (err) {
        res.status(500).json(err);
    }
});


router.post('/', async (req, res) => {
    try{
        const notesData = await Notes.create(req.body);
        res.status(200).json(notesData);
    }

    catch(err) {
        res.status(500).json(err);
    }
});








module.exports = router;