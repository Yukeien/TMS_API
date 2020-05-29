const express = require("express");
const router = express.Router();

const vaultController = require("../controllers/vaultController")

const auth = require("../middlewares/auth");

/**
 * @swagger
 * /vault/deposit-bank:
 *   post:
 *     tags:
 *       - Vault
 *     name: AddMoneyFromBank
 *     summary: Add money to user's portfolio
 *     requestBody:
 *       $ref: '#/components/requestBodies/Deposit Bank'
 *     responses:
 *       '201':
 *         description: Money successfully added.
 *       '422':
 *         description: Submitted data is incorrect.
 *       '500':
 *         description: Unexpected error.
 */
router.post(
    "/deposit-bank",
    auth.isAuthed,
    vaultController.addMoneyFromBank
);

/**
 * @swagger
 * /vault/deposit-card:
 *   post:
 *     tags:
 *       - Vault
 *     name: AddMoneyFromCard
 *     summary: Add money to user's portfolio
 *     requestBody:
 *       $ref: '#/components/requestBodies/Deposit Card'
 *     responses:
 *       '201':
 *         description: Money successfully added.
 *       '422':
 *         description: Submitted data is incorrect.
 *       '500':
 *         description: Unexpected error.
 */
router.post(
    "/deposit-card",
    auth.isAuthed,
    vaultController.addMoneyFromCard
);

/**
 * @swagger
 * /vault:
 *   get:
 *     tags:
 *       - Vault
 *     name: AccessUserVault
 *     summary: Get current user his balance and vault details
 *     responses:
 *       '200':
 *         description: Vault accessed succesfully
 *       '401':
 *         description: Auth failed
 *       '404':
 *         description: Submitted data is incorrect.
 *       '500':
 *         description: Unexpected error.
 */
router.get(
    "/",
    auth.isAuthed,
    vaultController.getVault
);

module.exports = router;