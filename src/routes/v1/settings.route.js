const express = require('express');
const { authJwt } = require("../../middleware");
const controller = require("../../controllers/settings.controller");

const router = express.Router();

router
    .route('/')
    .get([
        authJwt.verifyCookie
    ],
        (req, res) => res.send({ Status: "settings" })
    );

    router
    .route('/tokens')
    .get([
        authJwt.verifyCookie
    ],
        controller.getActiveRefreshTokens
    );

module.exports = router;