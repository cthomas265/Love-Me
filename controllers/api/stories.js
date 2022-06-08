const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Story , User, Animal, Category } = require('../../models');
const withAuth = require('../../utils/auth');

// get all stories
router.get('/', (req, res) => {
  Story.findAll({
    attributes: [
      'id',
      'content',
      'photo',
      'animal_id',
      'user_id'
    ],
    include: [
      {
        model: User,
          model: User,
          attributes: ['username']
      },
      {
        model: Animal,
        attributes: ['name']
      },
    ]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Story.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'content',
      'photo',
      'animal_id',
      'user_id'
    ],
    include: [
      {
        model: User,
          model: User,
          attributes: ['username']
      },
      {
        model: Animal,
        attributes: ['name']
      },
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.post('/', withAuth, (req, res) => {
  Story.create({
    content: req.body.content,
    photo: req.body.photo,
    user_id: req.session.user_id,
    animal_id: req.body.animal_id,
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.put('/:id', withAuth, (req, res) => {
  Story.update(
    {
      content: req.body.content,
      photo: req.body.photo,
      animal_id: req.body.animal_id
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  console.log('id', req.params.id);
  Story.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
