const express = require('express');
const gpioController = require('../../controllers/gpio.controller')

const router = express.Router();

router
    .route('/')
    .get((req, res, next) => {
        gpioController.activateRelay,
        res.json({
            "Status": "Ok",
            "Message": "Switch port"
        })
    });

router
    .route('/status')
    .get((req, res, next) => {
        res.json({
            "Status": "Unknown",
            "Message": "Not implemented yet"
        })
    });

module.exports = router;