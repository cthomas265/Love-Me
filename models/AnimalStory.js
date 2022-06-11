const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class AnimalStory extends Model {}

AnimalStory.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      animal_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'animal',
          key: 'id'
        }
      },
      story_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'story',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'animal_story',
    }
  );
  
  module.exports = AnimalStory;