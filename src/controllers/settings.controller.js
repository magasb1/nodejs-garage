const jwt = require("jsonwebtoken");
const config = require("../config/auth.js");
const db = require("../models");
const Op = db.Sequelize.Op;

const User = db.user;
const Role = db.role;
const RefreshToken = db.refreshToken;

exports.getActiveRefreshTokens = async (req, res, next) => {
    let _accessToken = req.cookies.accessToken
    let userId = jwt.verify(_accessToken, config.secret, (err, decoded) => {
        if (!err){
            return decoded.id
        } else {
            return false
        }
    })
    if (userId){
        let tokens=  await RefreshToken.findAll({where: { userId: userId, expired: false }})
        res.status(200).send(tokens)
    } else {
        res.status(401).send({Message: "Not available"})
    }
    
};