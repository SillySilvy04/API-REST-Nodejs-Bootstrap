const express = require('express');
const router = express.Router();

const Game = require('./Game.js');

const auth = require('../middlewares/auth.js');

router.get("/games", (req, res) => {
    Game.findAll().then(games => {
        if (games !== null) {
            res.statusCode = 200;
            res.json(games);
        } else {
            res.sendStatus(404);
        }
    });
});

router.get("/games/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);

        Game.findOne({ where: { id: id } }).then(game => {
            if (game !== null) {
                res.statusCode = 200;
                res.json(game);
            } else {
                res.sendStatus(404);
            }
        });
    }
});

router.delete("/game/:id", auth, (req, res) => {
    if (isNaN(req.params.id) || req.params.id === null) {
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);
        Game.destroy({ where: { id: id } })
            .then(() => {
                res.sendStatus(204);
            }).catch((error) => {
                console.log(error);
                res.sendStatus(404);
            });
    }
});

router.post("/game", auth, (req, res) => {
    var { title, price, year } = req.body;
    if ((isNaN(price) || isNaN(year)) || (title === undefined || title === '') || (price === undefined || year === undefined)) {
        res.sendStatus(400);
    } else {
        Game.findOne({ where: { title: title } }).then(game => {
            if (game === null) {
                Game.create({
                    title: title,
                    price: price,
                    year: year
                }).then(() => {
                    res.sendStatus(201);
                }).catch((error) => {
                    console.log(error);
                    res.sendStatus(400);
                });
            } else {
                res.sendStatus(409);
            }
        });
    }
});

router.put("/game/:id", auth, (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);

        Game.findOne({ where: { id: id } }).then(game => {
            if (game !== null) {
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
            } else {
                res.sendStatus(404);
            }

        });
    }
});

module.exports = router;