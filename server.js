const express = require("express"),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  swaggerUi = require("swagger-ui-express"),
  swaggerJSDoc = require("swagger-jsdoc");

const userRoutes = require("./API/routes/userRoutes"); // Importing route
const creditCardRoutes = require("./API/routes/creditCardRoutes")

const { devDb, testingDb } = require("./config");

//-------// SWAGGER DOCS //-------//
const swaggerDefinition = {
  info: {
    title: "TMSPay API Documentation",
    version: "1.0.0",
    description: "Endpoints of the TMSPay API.",
  },
  openapi: "3.0.0",
  host: "localhost:3000",
  basePath: "/",
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        name: "Authorization",
        scheme: "bearer",
        in: "header",
      },
    },
  },
};

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

app.use("/users", userRoutes); // register the route
app.use("/credit-cards", creditCardRoutes)

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

app.listen(port);

console.log("[START] TMSPay API started on port " + port);

module.exports = app;
