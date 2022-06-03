const { Category } = require('../models');

const categorydata = [
    {
        name: 'Dog'
    },
    {
        name: 'Cat'
    }
];

const seedCategory = () => Category.bulkCreate(categorydata);

module.exports = seedCategory;