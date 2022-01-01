const express = require('express');
const { verifySignUp, authJwt } = require("../../middleware");
const controller = require("../../controllers/auth.controller");

const router = express.Router();

// All requests to this router will
// first hit this middleware
router
    .use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

router
    .route('/signup')
    .post(
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted
        ],
        controller.signup
    )
router
    .route('/signin')
    .post(controller.signin)

    router
    .route('/signout')
    .get(controller.signout)

router
    .route('/roles')
    .get(
        [authJwt.verifyToken],
        controller.roles
        )

module.exports = router;