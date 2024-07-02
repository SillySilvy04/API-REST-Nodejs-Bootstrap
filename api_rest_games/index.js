const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database.js');
const cors = require('cors');

const GamesController = require('./game/GamesController.js'); 
const UsersController = require('./user/UsersController.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/", GamesController);
app.use("/", UsersController);

connection
    .authenticate()
    .then(() => {
        console.log('BD conectado');
    }).catch((error) => {
        console.log(error);
    });

app.listen(8080, () => {
    console.log('Servidor rodando na porta 8080');
});