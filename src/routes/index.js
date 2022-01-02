const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.js");
const db = require('../models')
//const gpioController = require('../controllers/gpio.controller')

const RefreshTokens = db.refreshToken
const router = express.Router();

/**
 * MIDDLEWARE
 */

verifyCookie = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    let validAccessToken
    // verify access token
    if (accessToken) {
        validAccessToken = jwt.verify(accessToken, config.secret, (err, decoded) => {
            if (err) {
                return false
            } else {
                req.userId = decoded.id;
                return true
            }
        });
    }

    if (!validAccessToken || !accessToken) {
        // verify refresh token
        if (!refreshToken) { return res.status(401).redirect('/login'); }

        let _refreshToken = await RefreshTokens.findOne({ where: { token: refreshToken } });
        if (!_refreshToken) { return res.status(403).redirect('/login'); }

        if (RefreshTokens.verifyExpiration(_refreshToken)) {
            RefreshTokens.setExpired(_refreshToken);
            return res.status(403).redirect('/login');
        }

        const user = await _refreshToken.getUser();
        let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: config.jwtExpiration,
        });

        req.userId = user.id;
        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        })
        next();
    } else {
        next();
    }
};

/**
 * ROUTES
 */

router
    .route('/')
    .get(verifyCookie, (req, res, next) => {
        res.render("index", {
            user: req.userId
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
    .get(verifyCookie, async (req, res, next) => {
        await RefreshTokens.setExpired(req.cookies.refreshToken);
        res
            .clearCookie("refreshToken")
            .clearCookie("accessToken")
            .status(200)
            .redirect('/')
    });

router
    .route('/logs')
    .get(verifyCookie, (req, res, next) => {
        res
            .status(200)
            .render("logs", {
                user: req.userId
            })
    });

router
    .route('/settings')
    .get(verifyCookie, (req, res, next) => {
        res
            .status(200)
            .render("settings", {
                user: req.userId
            })
    });

router
    .route('/about')
    .get(verifyCookie, (req, res, next) => {
        res
            .status(200)
            .render("about", {
                user: req.userId
            })
    });

module.exports = router;