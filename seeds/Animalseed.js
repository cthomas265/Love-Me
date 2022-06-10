const { Animal } = require('../models');

const animaldata = [
    {
        name: 'Nala',
        age: 4,
        photo: '/Images/image.png',
        description: 'Likes to stomp to the beat',
        category_id: 1
    },
    {
        name: 'Diamond',
        age: 8,
        photo: 'https://res.cloudinary.com/dzql8up82/image/upload/v1654212732/Louie_fptwe4.jpg',
        description: 'Stripper in former life. LOVES attention!',
        category_id: 1
    },
    {
        name: 'Biscuit',
        age: 1,
        photo: '/Images/image.png',
        description: 'Calico tortie baby who bakes',
        category_id: 2
    }
];

const seedAnimal = () => Animal.bulkCreate(animaldata);

module.exports = seedAnimal;