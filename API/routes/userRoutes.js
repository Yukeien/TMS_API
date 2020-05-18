const express = require("express");
const router = express.Router();

const UserController = require("../controllers/userController");

const validationSchemas = require("../models/validationSchema");
const validation = require("../middlewares/validation");

/**
 * @swagger
 * /users/signup:
 *   post:
 *     tags:
 *       - Users
 *     name: Register
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               repeat_password:
 *                 type: string
 *               address:
 *                 type: object
 *                 properties:
 *                   street:
 *                     type: string
 *                   zipcode:
 *                     type: string
 *                   city:
 *                     type: string
 *                   country:
 *                     type: string
 *               phoneNumber:
 *                 type: string
 *               birthdate:
 *                 type: date
 *           example:
 *             firstName: Jane
 *             lastName: Doe
 *             email: jane.doe@gmail.com
 *             password: Example1234%
 *             repeat_password: Example1234%
 *             address:
 *               street: 737 Malcolm X Blvd
 *               zipcode: "10027"
 *               city: New York
 *               country: United States
 *             phoneNumber: "5165830787"
 *             birthdate: 1997-05-07
 *         required:
 *           - email
 *           - password
 *           - repeat_password
 *           - firstName
 *           - lastName
 *           - street
 *           - city
 *           - zipcode
 *           - country
 *           - phoneNumber
 *           - birthdate
 *     responses:
 *       '201':
 *         description: User successfully created.
 *       '409':
 *         description: This phone number is linked to an existing user.
 *       '422':
 *         description: Submitted data is incorrect.
 *       '500':
 *         description: Unexpected error.
 */
router.post(
  "/signup",
  validation(validationSchemas.user),
  UserController.signup
);

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags:
 *       - Users
 *     name: Login
 *     summary: Logs a user in
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *           example:
 *             email: jane.doe@gmail.com
 *             password: Example1234%
 *         required:
 *           - email
 *           - password
 *     responses:
 *       '200':
 *         description: Auth successful.
 *       '401':
 *         description: Auth failed.
 *       '500':
 *         description: Unexpected error.
 */
router.post("/login", UserController.login);

module.exports = router;
