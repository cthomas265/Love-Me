const { Story } = require('../models');

const storydata = [
    {
        content: 'Adopted biscuit last month and she has completed our family! She bakes nonstop but loves it!',
        photo: 'https://res.cloudinary.com/dzql8up82/image/upload/v1655173724/ffww8kekrsciqgkt406j.jpg',
        user_id: 1
    },
    {
        content: 'Diamond is a HOT DOG. She communicates with licks and loves to go outside. Retirement is treating her wonderfully!',
        photo: 'https://res.cloudinary.com/dzql8up82/image/upload/v1654623517/diamond_iawcve.jpg',
        user_id: 2
    }
];

const seedStory = () => Story.bulkCreate(storydata);

module.exports = seedStory;