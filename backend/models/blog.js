// In models/blog.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');
const Comment = require('./comment');

const Blog = sequelize.define('blogs', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Blog.hasMany(Comment); 

module.exports = Blog;
