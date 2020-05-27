const express = require("express");
const router = express.Router();

const bankAccountController = require("../controllers/bankAccountController")

const auth = require("../middlewares/auth");

/**
 * @swagger
 * /banks:
 *   post:
 *     tags:
 *       - Bank Accounts
 *     name: RegisterBankAccount
 *     summary: Register a new bank account
 *     requestBody:
 *       $ref: '#/components/requestBodies/Bank Account'
 *     responses:
 *       '201':
 *         description: Bank Account successfully registered.
 *       '409':
 *         description: This bank account is already used by an existing user.
 *       '422':
 *         description: Submitted data is incorrect.
 *       '500':
 *         description: Unexpected error.
 */
router.post(
    "/",
    auth.isAuthed,
    bankAccountController.registerBankAccount
);

/**
 * @swagger
 * /banks:
 *   get:
 *     tags:
 *       - Bank Accounts
 *     name: GetBankAccounts
 *     summary: List user's bank accounts
 *     responses:
 *       '200':
 *         description: Bank account(s) successfully retrieved.
 *       '204':
 *         description: No bank account registered on this account.
 *       '500':
 *         description: Unexpected error.
 */
router.get("/", auth.isAuthed, bankAccountController.getBanks)

module.exports = router;
