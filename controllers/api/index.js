const router = require('express').Router();

const userRoutes = require('./user.js');
const storyRoutes = require('./stories');
const categoryRoutes = require('./category');
const animalRoutes = require('./animal');

router.use('/user', userRoutes);
router.use('/story', storyRoutes);
router.use('/category', categoryRoutes);
router.use('/animal', animalRoutes);

module.exports = router;
