const express = require("express");
const gpioController = require('../controllers/gpio.controller')

const router = express.Router();

router
    .route('/')
    .get( (req, res, next) => {
        console.log(`Door status: ${ gpioController.sensorStatus() }`)
        gpioController.sensorStatus()
        .then((value) => {
            res.render("index", {
                sensorStatus: value ? "Lukket" : "Åpen"
            })
        })
    });

module.exports = router;