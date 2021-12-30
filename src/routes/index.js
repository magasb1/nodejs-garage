const express = require("express");
const gpioController = require('../controllers/gpio.controller')

const router = express.Router();

router
    .route('/')
    .get( (req, res, next) => {
        console.log(`Door status: ${await gpioController.sensorStatus()}`)
        res.render("index", {
            sensorStatus: await gpioController.sensorStatus() ? "Lukket" : "Åpen"
        })
    });

module.exports = router;