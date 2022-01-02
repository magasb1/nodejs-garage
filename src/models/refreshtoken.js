'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require("uuid");
const config = require('../config/auth')

module.exports = (sequelize, DataTypes) => {
  class refreshToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      refreshToken.belongsTo(models.user, {
        foreignKey: 'userId', targetKey: 'id'
      });
    }
  };
  refreshToken.init({
    userId: DataTypes.INTEGER,
    token: DataTypes.STRING,
    expiryDate: DataTypes.DATE,
    expired: DataTypes.BOOLEAN,
    userAgent: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'refreshToken',
  });

  refreshToken.createToken = async (user, _userAgent) => {
    let expiredAt = new Date();

    expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);

    let _token = uuidv4();

    let _refreshToken = await refreshToken.create({
      token: _token,
      userId: user.id,
      expiryDate: expiredAt.getTime(),
      expired: false,
      userAgent: _userAgent
    });

    return _refreshToken.token;
  };

  refreshToken.setExpired = async (_token) => {
    await refreshToken.update({ expired: true}, {
      where: {
        token: _token
      }
    })
    return true
  };

  refreshToken.verifyExpiration = (token) => {
    if (token.expired) { return true }
    return token.expiryDate.getTime() < new Date().getTime();
  };

  return refreshToken;
};