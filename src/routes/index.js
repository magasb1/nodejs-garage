const express = require("express");
const gpioController = require('../controllers/gpio.controller')

const router = express.Router();

router
    .route('/')
    .get( (req, res, next) => {
        console.log(`Door status: ${gpioController.sensorStatus}`)
        res.render("index", {
            sensorStatus: gpioController.sensorStatus ? "Lukket" : "Åpen"
        })
    });

module.exports = router;