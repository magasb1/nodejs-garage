const express = require('express');
const gpioController = require('../../controllers/gpio.controller')

const router = express.Router();

router
    .route('/')
    .get(gpioController.activateRelay);

router
    .route('/status')
    .get((req, res, next) => {
        res.json({
            "Status": "Unknown",
            "Message": "Not implemented yet"
        })
    });

module.exports = router;