const router = require('express').Router();
const { Animal, Category, Story,User } = require('../models');
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

module.exports = router;
