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

router.get('/login', (req, res) => {
  res.render('login');
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

<<<<<<< HEAD
=======
// GET success stories
router.get('/success', (req, res) => {
  Story.findAll({
    attributes: [
      'id',
      'content',
      'photo',
      'user_id'
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Animal,
        attributes: ['name'],
        through: AnimalStory,
        as: 'animal_stories'
      },
    ]
  })
    .then(dbStoryData => {
      console.log(dbStoryData);
      const stories = dbStoryData.map(story => story.get({ plain: true }));

      res.render('success', {
        stories,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  
  res.render('login');
});

>>>>>>> 094908c6cb9503f07146a7e2c50a81fc46f6ad0b
module.exports = router;
