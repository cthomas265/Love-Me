const { Animal } = require('../models');

const animaldata = [
    {
        name: 'Nala',
        age: 4,
        photo: 'placeholder',
        description: 'Likes to stomp to the beat',
        category_id: 1
    },
    {
        name: 'Diamond',
        age: 8,
        photo: 'placeholder',
        description: 'Stripper in former life. LOVES attention!',
        category_id: 1
    },
    {
        name: 'Biscuit',
        age: 1,
        photo: 'placeholder',
        description: 'Calico tortie baby who bakes',
        category_id: 2
    }
];

const seedAnimal = () => Animal.bulkCreate(animaldata);

module.exports = seedAnimal;