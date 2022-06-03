const { User } = require('../models');

const userdata = [
    {
        username: 'llama',
        email: 'test@test.com',
        password: 'llamadrama'
    },
    {
        username: 'catdog',
        email: 'tester@test.com',
        password: 'hotdiggetydogcat'
    }
];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;