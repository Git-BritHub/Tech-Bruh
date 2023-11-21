const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'user',
            key: 'id',
          },
        },
        post_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'post',
            key: 'id',
          },
        comment: {
            type: DataTypes.TEXT
        }
        },
        date_created: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'comment',
      },
);

module.exports = Comment;