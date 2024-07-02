const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWTSecret = require('../passwords/jwtSecret.js');

const User = require("./User.js");

router.post("/auth", (req, res) => {
    if ((req.body.login !== null && req.body.login !== "") &&
        (req.body.password !== null && req.body.password !== "")) {
        User.findOne({
            where: {
                login: req.body.login
            }
        }).then(user => {
            if (user !== null) {
                var correct = bcrypt.compareSync(req.body.password, user.password);
                if (correct) {
                    jwt.sign({ id: user.id, login: user.login }, JWTSecret, { expiresIn: '24h' }, (err, token) => {
                        if (err) {
                            res.sendStatus(400);
                        } else {
                            res.statusCode = 200;
                            res.json({ token: token });
                        }
                    });
                } else {
                    res.sendStatus(401);
                }
            } else {
                res.sendStatus(404);
            }
        });
    } else {
        res.sendStatus(400);
    }
});

router.get("/users", (req, res) => {
    User.findAll().then(users => {
        if (users !== null) {
            res.statusCode = 200;
            res.json(users);
        } else {
            res.sendStatus(404);
        }
    });
});

router.get("/user/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);

        User.findOne({ where: { id: id } }).then(user => {
            if (user !== null) {
                res.statusCode = 200;
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        });
    }
});

router.delete("/user/:id", (req, res) => {
    if (isNaN(req.params.id) || req.params.id === null) {
        res.sendStatus(400);
    } else {
        User.destroy({ where: { id: req.params.id } })
            .then(() => {
                res.sendStatus(200);
            }).catch((error) => {
                console.log(error);
                res.sendStatus(404);
            });
    }
});

router.post("/user", (req, res) => {
    var { login, password, name } = req.body;
    if ((login === undefined || login === '') ||
        (password === undefined || password === '') ||
        (name === undefined || name === '')) {
        res.sendStatus(400);
    } else {
        User.findOne({
            where: {
                login: login
            }
        }).then(user => {
            if (user === null) {
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(password, salt);

                User.create({
                    login: login,
                    password: hash,
                    name: name
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

module.exports = router;
