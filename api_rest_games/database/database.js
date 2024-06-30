const Sequelize = require("sequelize");

const connection = new Sequelize('jogos_api','root','silly130504',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: "-03:00"
});

module.exports = connection;