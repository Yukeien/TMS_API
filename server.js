const express = require("express"),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  swaggerUi = require("swagger-ui-express"),
  swaggerJSDoc = require("swagger-jsdoc");

// Importing route
const userRoutes = require("./API/routes/userRoutes");
const creditCardRoutes = require("./API/routes/creditCardRoutes");
const bankAccountRoutes = require("./API/routes/bankAccountRoutes");
const vaultRoutes = require("./API/routes/vaultRoutes");
const transferRoutes = require("./API/routes/transferRoutes");

const { devDb, testingDb } = require("./config");

//-------// SWAGGER DOCS //-------//
const swaggerDefinition = require('./api.json');

const options = {
  swaggerDefinition,
  apis: ["./API/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
app.get("/swagger.json", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//-------// SWAGGER DOCS //-------//

let dbURI = "null";

if (process.env.NODE_ENV === "test") {
  dbURI = testingDb;
} else {
  dbURI = devDb;
}

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect(dbURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//* HANDLING CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Expose-Headers", "X-Total-Count");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Register the routes
app.use("/users", userRoutes);
app.use("/credit-cards", creditCardRoutes);
app.use("/banks", bankAccountRoutes);
app.use("/vault", vaultRoutes);
app.use("/transfer", transferRoutes);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

app.listen(port);

console.log("[START] TMSPay API started on port " + port);

module.exports = app;
