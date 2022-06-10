const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Story , User, Animal, Category, AnimalStory } = require('../../models');
const withAuth = require('../../utils/auth');

// get all stories
router.get('/', (req, res) => {
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
      }
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
        attributes: ['name'],
        through: AnimalStory,
        as: 'animal_stories'
      }
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
    user_id: req.session.user_id
  })
    .then((story) => {
      // if an animal id or more exists
      if (req.body.animalIds.length) {
        // map entered animal ids to the animal_id parameter
        const storyAnimalIdArr = req.body.animalIds.map((animal_id) => {
          // create an object with the story_id and the animal_id
          return {
            story_id: story.id,
            animal_id,
          };
        });
        // bulk creat AnimalStory records for each animal id in the story
        return AnimalStory.bulkCreate(storyAnimalIdArr);
      }
      // if no animal ids, move on
      res.status(200).json(story);
    })
    .then((storyAnimalIds) => res.status(200).json(storyAnimalIds))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.put('/:id', withAuth, (req, res) => {
  Story.update(req.body,
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then((story) => {
      // find all associated animals from AnimalStory
      return AnimalStory.findAll({ where: { story_id: req.params.id } });
    })
    .then((animalStories) => {
      // get list of current animal_ids
      const storyAnimalIds = animalStories.map(({ animal_id }) => animal_id);
      // create filtered list of new animal_ids
      const newAnimalStories = req.body.animalIds
        .filter((animal_id) => !storyAnimalIds.includes(animal_id))
        .map((animal_id) => {
          return {
            story_id: req.params.id,
            animal_id,
          };
        });
      // figure out which ones to remove
      const animalStoriesToRemove = animalStories
        .filter(({ animal_id }) => !req.body.animalIds.includes(animal_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        AnimalStory.destroy({ where: { id: animalStoriesToRemove } }),
        AnimalStory.bulkCreate(newAnimalStories),
      ]);
    })
    .then((updatedAnimalStories) => res.json(updatedAnimalStories))
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
