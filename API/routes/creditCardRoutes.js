const express = require("express");
const router = express.Router();

const creditCardController = require("../controllers/creditCardController")

/**
 * @swagger
 * /credit-cards:
 *   post:
 *     tags:
 *       - Credit Cards
 *     name: RegisterCreditCard
 *     summary: Register a new credit card
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               creditCardName:
 *                 type: string
 *               cardHolderName:
 *                 type: string
 *               creditCardNumber:
 *                 type: Number
 *               expirationDate:
 *                 type: Number
 *               CCV:
 *                 type: Number
 *               userID:
 *                 type: string
 *           example:
 *             creditCardName: CurrentAccount
 *             cardHolderName: Jane
 *             creditCardNumber: 4321567890121234
 *             expirationDate: 0898
 *             CCV: 233
 *             userID: Example1234%
 *         required:
 *           - creditCardName
 *           - cardHolderName
 *           - creditCardNumber
 *           - expirationDate
 *           - CCV
 *           - userID
 *     responses:
 *       '201':
 *         description: Credit Card successfully registered.
 *       '409':
 *         description: This credit card is already used by an existing user.
 *       '422':
 *         description: Submitted data is incorrect.
 *       '500':
 *         description: Unexpected error.
 */
router.post(
    "/credit-cards",
    creditCardController.registerCreditCard
);

/**
 * @swagger
 * /credit-cards:
 *   get:
 *     tags:
 *       - Credit Cards
 *     name: GetCreditCards
 *     summary: Get user's credit cards
 *     responses:
 *       '200':
 *         description: Credit card(s) successfully retrieved.
 *       '204':
 *         description: No credit card registered on this user account.
 *       '500':
 *         description: Unexpected error.
 */
router.get("/credit-cards", creditCardController.getCreditCard)

// router.put("/credit-card", creditCardController.updateCreditCard)

/**
 * @swagger
 * /credit-cards/{creditCardName}:
 *   delete:
 *     tags:
 *       - Credit Cards
 *     name: DeleteCreditCard
 *     summary: Delete a credit card
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               creditCardName:
 *                 type: string
 *           example:
 *             creditCardName: CompteCourant
 *         required:
 *           - creditCardName
 *     responses:
 *       '200':
 *         description: Credit Card successfully deleted.
 *       '500':
 *         description: Unexpected error.
 */
router.delete("/credit-card", creditCardController.deleteCreditCard);

module.exports = router;
