const express = require('express');
const gpioController = require('../../controllers/gpio.controller')

const router = express.Router();

router
    .route('/')
    .get(gpioController.activateRelay)
    .post(gpioController.activateRelay)

router
    .route('/status')
    .get(gpioController.sensorStatus);

module.exports = router;