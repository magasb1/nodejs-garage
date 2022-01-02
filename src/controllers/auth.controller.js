var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const db = require("../models");
const config = require("../config/auth.js");

const User = db.user;
const Role = db.role;
const RefreshToken = db.refreshToken;

const Op = db.Sequelize.Op;


exports.refreshToken = async (req, res, next) => {
  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }

  try {
    let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });

    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({ where: { id: refreshToken.id } });
      
      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }

    const user = await refreshToken.getUser();
    let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

exports.roles = async (req, res) => {
  Role.findAll({ attributes: ["name"] }).then((roles) => {
    let array = []
    roles.forEach(element => {
      array.push(element.name)
    });
    res.status(200).send(array)
  })
};

exports.signup = async (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = async (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpiration
      });

      var refreshToken = await RefreshToken.createToken(user, req.get('User-Agent'));

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: config.jwtRefreshExpiration * 1000, // convert from minute to milliseconds
        })
        .cookie("accessToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production"
        })
        .status(200)
        .send({
          id: user.id,
          username: user.username,
          roles: authorities,
          accessToken: token,
          refreshToken: refreshToken,
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signout = async (req, res, next) => {
    res
      .clearCookie("refreshToken")
      .clearCookie("accessToken")
      .status(200)
      .send({ message: "Successfully logged out" });
};
