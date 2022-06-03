const { Model, DataTypes } = requires('sequelize');
const sequelize = require('../config/connection');

class Story extends Model {}

Story.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoincrement: true
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING
        },
        animal_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'animal',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'story'
    }
)

module.exports = Story;