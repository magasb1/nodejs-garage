const express = require('express');
const { authJwt } = require("../../middleware");
const controller = require("../../controllers/logs.controller");

const router = express.Router();

router
    .route('/http')
    .get([
        authJwt.verifyCookie
    ],
        controller.systemLogs    
    //(req, res) => res.send({ Status: "logs" })
    );

module.exports = router;