const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('blogdata','root','Pintu@1998',{
    dialect:'mysql',
    host:'localhost'
})

module.exports= sequelize 