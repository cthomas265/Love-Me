const { Story } = require('../models');

const storydata = [
    {
        content: 'Adopted biscuit last month and she has completed our family! She bakes nonstop but loves it!',
        photo: 'placeholder',
        animal_id: 3,
        user_id: 1
    },
    {
        content: 'Diamond is a HOT DOG. She communicates with licks and loves to go outside. Retirement is treating her wonderfully!',
        photo: 'placeholder',
        animal_id: 2,
        user_id: 2
    }
];

const seedStory = () => Story.bulkCreate(storydata);

module.exports = seedStory;