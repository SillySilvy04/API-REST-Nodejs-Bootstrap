const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var DB = {
    games: [
        {
            id: 23,
            title: "Call of Duty MW",
            year: 2019,
            price: 60
        },
        {
            id: 65,
            title: "Sea of Thieves",
            year: 2018,
            price: 40
        },
        {
            id: 2,
            title: "Minecraft",
            year: 2012,
            price: 20
        }
    ]
}

app.get("/games", (req,res) => {
    res.statusCode = 200;
    res.json(DB.games);
});

app.get("/games/:id", (req,res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);

        var game = DB.games.find(game => game.id == id);
        if(game !== undefined){
            res.statusCode = 200;
            res.json(game);
        }else{
            res.sendStatus(404);
        }
    }
});

app.delete("/game/:id", (req,res) => {
    if(isNaN(req.params.id)){
        console.log("teste1");
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        console.log(id);
        var index = DB.games.findIndex(game => game.id == id);
        console.log(index);
        
        if(index === -1){
            console.log("teste2");
            res.sendStatus(404);
        }else{
            console.log("teste3");
            DB.games.splice(index, 1);
            res.sendStatus(200);
        }

    }
});

app.post("/game/:id", (req,res) => {
    var { title, price, year } = req.body;
    if((isNaN(price) || isNaN(year)) || (title === undefined || title === '') || (price === undefined || year === undefined)){
        res.sendStatus(400);
    }else{
        DB.games.push({
            id: 232,
            title,
            price,
            year
        });
        res.sendStatus(200);
    }
});

app.put("/game/:id", (req,res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        var game = DB.games.find(game => game.id == id);

        if(game !== undefined){
            var { title, price, year } = req.body;
            
            if(title !== undefined){
                game.title = title;
            }
            if(price !== undefined){
                if(isNaN(price)){
                    res.sendStatus(400);
                }else{
                    game.price = price;
                }
            }
            if(year !== undefined){
                if(isNaN(year)){
                    res.sendStatus(400);
                }else{
                    game.year = year;
                }
            }
            res.sendStatus(200);
        }else{
            res.sendStatus(404);
        }
    }
});

app.listen(3000, () => {
    console.log('rodô');
});