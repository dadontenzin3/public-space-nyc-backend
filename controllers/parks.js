const Park = require('../models/park');
const router = require('express').Router(); 

// Index
router.get('/', async (req, res) => {
    try {
        res.status(200).json(await Park.find({createdBy: req.user.uid}));
    } catch(error) {
        res.status(400).json({ message: 'bad request'});
    } 
});

// Create 
router.post('/', async (req, res) => {

    req.body.createdBy = req.user.uid;
    try{
        res.status(201).json(await Park.create(req.body));
    } catch(error) {
        res.status(400).json({ message: 'bad request'});
    }
})

// Delete 
router.delete('/:id', async (req, res) => {
    try {
        res.status(200).json(await Park.findByIdAndDelete(req.params.id));
    } catch (error) {
        res.status(400).json({ message: 'bad request'});
    }
})

// Update
router.put('/:id', async (req, res) => {
    try {
        res.status(200).json(await Park.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true}
        ));
    } catch (error) {
        res.status(400).json({ message: 'bad request'});
    }
})


module.exports = router;