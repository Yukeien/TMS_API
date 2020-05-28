const express = require("express");
const router = express.Router();

const UserController = require("../controllers/userController");

const validationSchemas = require("../models/validationSchema");
const validation = require("../middlewares/validation");
const auth = require("../middlewares/auth");

/**
 * @swagger
 * /users/signup:
 *   post:
 *     tags:
 *       - Users
 *     name: Register
 *     summary: Register a new user
 *     requestBody:
 *       $ref: '#/components/requestBodies/User'
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
 *       $ref: '#/components/requestBodies/UserCredentials'
 *     responses:
 *       '200':
 *         description: Auth successful.
 *       '401':
 *         description: Auth failed.
 *       '500':
 *         description: Unexpected error.
 */
router.post("/login", UserController.login);

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     tags:
 *       - Users
 *     name: Get profile
 *     summary: Get a user by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/userId'
 *     responses:
 *       '200':
 *         description: Profile retrieved successfully.
 *       '401':
 *         description: Auth failed.
 *       '403':
 *         description: Non Authorized.
 *       '404':
 *         description: User was not found.
 *       '500':
 *         description: Unexpected error.
 */
router.get("/:userId", auth.isUser, UserController.getProfile);

module.exports = router;
