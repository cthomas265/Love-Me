const router = require('express').Router()
const { Category, User, Animal, Story } = require('../../models')
const withAuth = require('../../utils/auth')

// GET all animals
router.get('/', (req, res) => {
  Animal.findAll()
    .then(dbAnimalData => res.json(dbAnimalData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET animal by ID
router.get('/:id', (req, res) => {
  Animal.findAll({
    where: {
      id: req.params.id
    }
  })
    .then(dbAnimalData => {
      if (!dbAnimalData) {
        res.status(404).json({ message: 'No pet found with this id' });
        return;
      }
      res.json(dbAnimalData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST new animal
router.post('/', withAuth, (req, res) => {
  Animal.create({
    name: req.body.name,
    age: req.body.age,
    photo: req.body.photo,
    description: req.body.description,
    category_id: req.body.category_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Update an animal record
router.put('/:id', withAuth, (req, res) => {
  Animal.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(dbAnimalData => {
      if (!dbAnimalData) {
        res.status(404).json({ message: 'No pet found with this id' });
        return;
      }
      res.json(dbAnimalData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  Animal.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No pet found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
