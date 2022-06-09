const { AnimalStory } = require('../models');

const animalStoryData = [
  {
    story_id: 1,
    animal_id: 3,
  },
  {
    story_id: 2,
    animal_id: 1,
  },
  {
    story_id: 2,
    animal_id: 2,
  }
];

const seedAnimalStory = () => AnimalStory.bulkCreate(animalStoryData);

module.exports = seedAnimalStory;