
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Comment = sequelize.define('comments', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Comment;
