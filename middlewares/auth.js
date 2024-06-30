const jwt = require('jsonwebtoken');
const JWTSecret = require('../passwords/jwtSecret');

function auth(req,res,next){
    const authToken = req.headers['authorization'];

    
    if(authToken !== undefined){
        const bearer = authToken.split(' ');
        var token = bearer[1];
        jwt.verify(token, JWTSecret, (err, data) => {
            if(err){
                res.sendStatus(401);
            }else{
                req.token = token;
                req.loggedUser = {id: data.id, login: data.login};
                next();
            }
        });
    }else{
        res.sendStatus(401);
    }
}

module.exports = auth; 