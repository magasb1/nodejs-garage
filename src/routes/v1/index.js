const express = require('express');
const {authJwt} = require('../../middleware')

const doorRoute = require('./door.route');
const logsRoute = require('./logs.route')
const authRoute = require('./auth.route')
const settingsRoute = require('./settings.route')

const router = express.Router();

router
  .route('/')
  .get((req ,res, next) => {
        res.json({
            "Status": "Ok",
            "Message": "API version 1"
        })
  });



const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute
    },
    {
        path: '/door',
        route: doorRoute,
    },
    {
        path: '/logs',
        route: logsRoute,
    },
    {
        path: '/settings',
        route: settingsRoute,
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;