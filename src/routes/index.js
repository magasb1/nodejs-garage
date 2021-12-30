const express = require("express");
const gpioController = require('../controllers/gpio.controller')

const router = express.Router();

router
    .route('/')
    .get( (req, res, next) => {
        res.render("index", {
            sensorStatus: sensorData
        })
    });

module.exports = router;