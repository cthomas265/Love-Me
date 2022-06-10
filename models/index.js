const Animal = require('./Animal');
const AnimalStory = require('./AnimalStory');
const Category = require('./Category');
const Story = require('./Story');
const User = require('./User');

Category.hasMany(Animal, {
    foreignkey: 'animal_id'
});

Animal.belongsTo(Category, {
    foreignkey: 'animal_id'
});

Story.belongsTo(User, {
    foreignkey: 'user_id'
});

User.hasMany(Story, {
    foreignKey: 'user_id'
});

Story.belongsToMany(Animal, {
    through: AnimalStory,
    as: 'animal_stories',
    foreignkey: 'story_id'
});

Animal.belongsToMany(Story, {
    through: AnimalStory,
    as: 'animal_stories',
    foreignkey: 'animal_id'
});

AnimalStory.belongsTo(Animal, {
    foreignKey: 'animal_id'
});

AnimalStory.belongsTo(Story, {
    foreignKey: 'story_id'
});

module.exports = { Animal, Category, Story, User, AnimalStory };