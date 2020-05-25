const jwt = require("jsonwebtoken");
const { jwtKey } = require("../../config");

module.exports = {
  isAuthed: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, jwtKey);
      req.userData = decoded;
      res.locals.userId = req.userData.userId;
      next();
    } catch (error) {
      return res.status(401).json({
        message: "Auth failed",
      });
    }
  },
  isUser: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, jwtKey);
      req.userData = decoded;
      if (req.userData.userId === req.params.userId) next();
      else {
        return res.status(403).json({
          message: "Access Non Authorized",
        });
      }
    } catch (error) {
      return res.status(401).json({
        message: "Auth failed",
      });
    }
  },
};
