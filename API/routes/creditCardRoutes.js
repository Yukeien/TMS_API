const express = require("express");
const router = express.Router();

const creditCardController = require("../controllers/creditCardController")

/**
 * @swagger
 * /credit-cards:
 *   post:
 *     tags:
 *       - Credit Cards
 *     name: RegisterCard
 *     summary: Register a new credit card
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
 *             cardHolderName: Jane
 *             creditCardNumber: 4321567890121234
 *             expirationDate: 0898
 *             CCV: 233
 *             userID: Example1234%
 *         required:
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
    creditCardController.registerCard
);

/**
 * @swagger
 * /credit-cards:
 *   get:
 *     tags:
 *       - Credit Cards
 *     name: GetCards
 *     summary: Get user's credit cards
 *     responses:
 *       '201':
 *         description: Credit card successfully retrieved.
 *       '204':
 *         description: No credit card registered on this user account.
 *       '500':
 *         description: Unexpected error.
 */
router.get("/credit-cards", creditCardController.getCard)

// router.put("/credit-card", creditCardController.updateCard)

// router.delete("/credit-card", creditCardController.deleteCard);

module.exports = router;
