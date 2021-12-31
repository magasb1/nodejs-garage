const db = require("./src/models");

    db.user.findAndCountAll({
        nested: true
    })
    .then(users => {
        if (users) {
            console.log(users)
        }
    })