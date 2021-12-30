const express = require("express");
const gpioController = require('../controllers/gpio.controller')

const router = express.Router();

async function sensorData () {
    const sensorStatus = await gpioController.sensorStatus
    var d = sensorStatus ? "Åpen" : "Lukket"
}

router
    .route('/')
    .get( (req, res, next) => {
        res.render("index", {
            sensorStatus: sensorData
        })
    });

module.exports = router;