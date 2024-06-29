const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database.js');

const Game = require("./game/Game.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connection
    .authenticate()
    .then(() => {
        console.log('BD conectado');
    }).catch((error) => {
        console.log(error);
    });

app.get("/games", (req, res) => {
    Game.findAll().then(games => {
        if(games !== null){
            res.statusCode = 200;
            res.json(games);
        }else{
            res.sendStatus(404);
        }
    });
});

app.get("/games/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);

        Game.findOne({where: {id: id}}).then(game => {
            if(game !== null){
                res.statusCode = 200;
                res.json(game);
            }else{
                res.sendStatus(404);
            }
        });
    }
});

app.delete("/game/:id", (req, res) => {
    if (isNaN(req.params.id) || req.params.id === null) {
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);
        Game.destroy({where: {id: id}})
            .then(() => {
                res.sendStatus(200);
            }).catch((error) => {
                console.log(error);
                res.sendStatus(404);
            });
    }
});

app.post("/game", (req, res) => {
    var { title, price, year } = req.body;
    if ((isNaN(price) || isNaN(year)) || (title === undefined || title === '') || (price === undefined || year === undefined)) {
        res.sendStatus(400);
    } else {
        Game.findOne({where: {title: title}}).then(game => {
            console.log(game);
            if(game === null){
                Game.create({
                    title: title,
                    price: price,
                    year: year
                }).then(() => {
                    res.sendStatus(200);
                }).catch((error) => {
                    console.log(error);
                    res.sendStatus(400);
                });
            }else{
                res.sendStatus(409);
            }
        });
    }
});

app.put("/game/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);
        Game.findOne({where: {id: id}}).then(game => {
            if(game !== null){
                var { title, price, year } = req.body;
                if (title !== undefined) {
                    game.title = title;
                }
                if (price !== undefined) {
                    if (isNaN(price)) {
                        res.sendStatus(400);
                    } else {
                        game.price = price;
                    }
                }
                if (year !== undefined) {
                    if (isNaN(year)) {
                        res.sendStatus(400);
                    } else {
                        game.year = year;
                    }
                }
                game.save();
                res.sendStatus(200);
            }else{
                res.sendStatus(404);
            }
        });
    }
});

app.listen(3000, () => {
    console.log('rodô');
});