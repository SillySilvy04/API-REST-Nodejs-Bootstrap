const Sequelize = require("sequelize");
const connection = require("../database/database.js");

const User = connection.define('users',{
    login:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

User.sync({force: true}).then(() => {});

module.exports = User;