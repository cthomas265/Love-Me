const sequelize = require('../config/connection');
const seedAnimal = require('./Animalseed');
const seedCategory = require('./Categoryseed');
const seedStory = require('./Storyseed');
const seedUser = require('./Userseed');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedCategory();

  await seedAnimal();

  await seedUser();
   
  await seedStory();

  process.exit(0);
};

seedAll();