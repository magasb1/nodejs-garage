const express = require("express");
const gpioController = require('../controllers/gpio.controller')

const router = express.Router();

router
    .route('/')
    .get( (req, res, next) => {
        gpioController.sensorStatus()
        .then((value) => {
            console.log(`Door status: ${value}`)
            res.render("index", {
                sensorStatus: value ? "Lukket" : "Åpen"
            })
        })
    });

module.exports = router;