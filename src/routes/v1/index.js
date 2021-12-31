const express = require('express');
const {authJwt} = require('../../middleware')
const doorRoute = require('./door.route');
const authRoute = require('./auth.route')

const router = express.Router();

router
  .route('/')
  .get((req ,res, next) => {
        res.json({
            "Status": "Ok",
            "Message": "API version 1"
        })
  });

  router
  .route('/test')
  .get((req ,res, next) => {
      [authJwt.verifyToken],
        res.json({
            "Status": "Ok",
            "Message": "API version 1"
        })
  });


const defaultRoutes = [
    {
        path: '/door',
        route: doorRoute,
    },
    {
        path: '/auth',
        route: authRoute
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;