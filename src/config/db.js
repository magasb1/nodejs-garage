const path = require('path');

module.exports = {
  development: {
    dialect: "sqlite",
    storage: path.join(__dirname, "../../config/db/development.db")
  },
  test: {
    dialect: "sqlite",
    storage: ":memory"
  },
  production: {
    dialect: "sqlite",
    storage: path.join(__dirname, "../../config/db/production.db"),
    logging: false
  }
};