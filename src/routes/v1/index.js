const express = require('express');
const doorRoute = require('./door.route');

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
        path: '/door',
        route: doorRoute,
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;