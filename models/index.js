const Animal = require('./Animal');
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

Story.hasMany(Animal, {
    foreignkey: 'animal_id'
});

Animal.hasMany(Story, {
    foreignkey: 'animal_id'
});

User.hasMany(Story, {
    foreignKey: 'user_id'
});

module.exports = { Animal, Category, Story, User };