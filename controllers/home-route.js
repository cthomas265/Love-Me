const router = require('express').Router();
const { Animal, Category, Story,User } = require('../models');
const withAuth = require('../utils/auth');
// TODO: Import the custom middleware

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
      animals.get({ plain: true })
    );

    res.render('homepage', {
      pets,
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

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  
  res.render('login');
});

module.exports = router;
