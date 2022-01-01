const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.js");
const { User } = require('../models')
//const gpioController = require('../controllers/gpio.controller')

const router = express.Router();

verifyCookie = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(403).redirect('/login');
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

router
    .route('/')
    .get(verifyCookie, (req, res, next) => {
        res.render("index", {

        })
    });

router
    .route('/login')
    .get((req, res, next) => {
        res
            .status(200)
            .render("login")
    });

router
    .route('/logout')
    .get((req, res, next) => {
        res
            .clearCookie("accessToken")
            .status(200)
            .redirect('/')
    });

module.exports = router;