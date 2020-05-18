const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  devDb: process.env.CLUSTER_DEV,
  jwtKey: process.env.JWT_KEY,
  testingDb: process.env.CLUSTER_TEST,
};
