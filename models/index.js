const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// User Post belongs to User
Post.belongsTo(User, {
  foreignKey: 'user_id',
});

// User has many Posts
User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// User Comment belongs to User
Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

// User has many Comments
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// User Comment belongs to Post
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

// User Post has many Comments
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

module.exports = { User, Post, Comment };