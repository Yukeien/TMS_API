const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { jwtKey } = require("../../config");

exports.signup = (req, res, next) => {
  const phoneNumber = req.body.phoneNumber;
  User.findOne({ phoneNumber: phoneNumber })
    .exec()
    .then(user => {
      if (user) {
        return res.status(409).json({
          message: "This phone number is linked to an existing user.",
        });
      }

      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        address: {
          street: req.body.address.street,
          city: req.body.address.city,
          zipcode: req.body.address.zipcode,
          country: req.body.address.country,
        },
        phoneNumber: req.body.phoneNumber,
        birthdate: req.body.birthdate,
      });
      newUser
        .save()
        .then(result => {
          return res.status(201).json({
            message: "User successfully created.",
          });
        })
        .catch(err => {
          return res.status(500).json({
            error: err,
          });
        });
    })
    .catch(err => {
      return res.status(500).json({
        error: err,
      });
    });
};

exports.login = (req, res, next) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  User.findOne({ email: userEmail })
    .exec()
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed.",
        });
      } else if (!user.checkPassword(userPassword)) {
        return res.status(401).json({
          message: "Auth failed.",
        });
      } else {
        const token = jwt.sign(
          {
            userId: user._id,
          },
          jwtKey,
          {
            expiresIn: "1h",
          }
        );
        return res.status(200).json({
          message: "Auth successful.",
          token: token,
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: err,
      });
    });
};

exports.getProfile = (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    .select(
      "-salt -hashedPassword -resetPasswordToken -resetPasswordExpires -__v -createdOn"
    )
    .exec()
    .then(user => {
      if (!user) {
        return res.status(404).json({
          message: "User " + id + " was not found",
        });
      } else {
        return res.status(200).json(user);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
