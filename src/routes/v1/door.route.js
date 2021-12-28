const express = require('express');

const router = express.Router();

router
    .route('/')
    .get((req, res, next) => {
        res.json({
            "Status": "Ok",
            "Message": "Switch port"
        })
    });

router
    .route('/status')
    .get((req, res, next) => {
        res.json({
            "Status": "Unknown",
            "Message": "Not implemented yet"
        })
    });

module.exports = router;