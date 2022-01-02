const express = require('express');
const { verifySignUp, authJwt } = require("../../middleware");
const controller = require("../../controllers/auth.controller");
//const gpioController = require('../../controllers/gpio.controller')

const router = express.Router();

router
    .route('/')
    .post([
        authJwt.verifyToken
    ],
    (req, res) => res.send({Status: "ok"})
    //gpioController.activateRelay
    );

router
    .route('/status')
    .get([
        authJwt.verifyCookie
    ],
    (req, res) => res.send({Status: "ok"})
    //gpioController.sensorStatus
    );


module.exports = router; 