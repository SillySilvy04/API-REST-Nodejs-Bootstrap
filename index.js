const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database.js');

const Game = require("./game/Game.js");
const User = require("./user/User.js");

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

//user routes

app.post("auth",(req,res) => {

});

app.get("/users", (req, res) => {
    User.findAll().then(users => {
        if(users !== null){
            res.statusCode = 200;
            res.json(users);
        }else{
            res.sendStatus(404);
        }
    });
});

app.get("/user/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);

        User.findOne({where: {id: id}}).then(user => {
            if(user !== null){
                res.statusCode = 200;
                res.json(user);
            }else{
                res.sendStatus(404);
            }
        });
    }
});

app.delete("/user/:id", (req, res) => {
    if (isNaN(req.params.id) || req.params.id === null) {
        res.sendStatus(400);
    } else {
        User.destroy({where: {id: req.params.id}})
            .then(() => {
                res.sendStatus(200);
            }).catch((error) => {
                console.log(error);
                res.sendStatus(404);
            });
    }
});

app.post("/user", (req, res) => {
    var { login, password, name } = req.body;
    console.log(login);
    console.log(password);
    console.log(name);
    if ((login === undefined || login === '') || 
    (password === undefined || password === '') || 
    (name === undefined || name === '')) {
        console.log("teste")
        res.sendStatus(400);
    } else {
        User.findOne({where: {
            login: login
        }
    }).then(user => {
            if(user === null){
                User.create({
                    login: login,
                    password: password,
                    name: name
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

app.listen(8080, () => {
    console.log('rodô');
});