const router = require('express').Router();
const { Animal, Category, Story, User, AnimalStory } = require('../models');
const withAuth = require('../utils/auth');

// GET all Animals for homepage
router.get('/', async (req, res) => {
  try {
    const animalData = await Animal.findAll({
      include: [
        {
          model: Category,
        },
      ],
    });

    const animals = animalData.map((pet) =>
      pet.get({ plain: true })
    );

    res.render('homepage', {
      animals,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// GET one gallery
router.get('/animal/:id',withAuth, async (req, res) => {
  
    try {
      const animalData = await Animal.findByPk(req.params.id, {
        include: [
          {
            model: Category,
          },
        ],
      });
      const animal = animalData.get({ plain: true });
      res.render('animal', { animal, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

// GET success stories
router.get('/success', (req, res) => {
  Story.findAll({
=======
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/animal/:id', (req, res) => {
  Animal.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'description',
      'name',
      'photo',
    ]
  })
<<<<<<< HEAD
    .then(dbStoryData => {
      console.log(dbStoryData);
      const stories = dbStoryData.map(story => story.get({ plain: true }));
      console.log(stories);
=======
    .then(dbPostData => {
      console.log(dbPostData);
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
>>>>>>> 90d5888d474b0bdd99e5793cdb8c3faf327111e6

      const animals = dbPostData.get({ plain: true });

      console.log(animals);
      res.render('single-animal', {
        animals,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// GET success stories
router.get('/pets', (req, res) => {
  Animal.findAll({
    attributes: [
      'id',
      'name',
      'photo',
      'description'
    ],

  })
    .then(dbStoryData => {
      console.log(dbStoryData);
      const animals = dbStoryData.map(story => story.get({ plain: true }));

      res.render('pets', {
        animals,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
