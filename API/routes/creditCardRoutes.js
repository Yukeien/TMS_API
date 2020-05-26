const express = require("express");
const router = express.Router();

const creditCardController = require("../controllers/creditCardController")

const auth = require("../middlewares/auth");

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
 *               cardType:
 *                 type: string
 *               creditCardNumber:
 *                 type: Number
 *               expirationDate:
 *                 type: Number
 *               CCV:
 *                 type: Number
 *               billingAddress:
 *                 type: String
 *           example:
 *             creditCardName: Mastercard-Family
 *             cardHolderName: Jane
 *             cardType: Mastercard
 *             creditCardNumber: 4321567890121234
 *             expirationDate: 0898
 *             CCV: 233
 *             billingAddress: 33 rue du Test, Champigny, 94500, France
 *         required:
 *           - creditCardName
 *           - cardHolderName
 *           - cardType
 *           - creditCardNumber
 *           - expirationDate
 *           - CCV
 *           - billingAddress
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
    "/",
    auth.isAuthed,
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
router.get("/", auth.isAuthed, creditCardController.getCreditCards)

/**
 * @swagger
 * /credit-cards/{creditCardName}:
 *   get:
 *     tags:
 *       - Credit Cards
 *     name: GetCreditCard
 *     summary: Get a credit card by it's name
 *     responses:
 *       '200':
 *         description: Credit card successfully retrieved.
 *       '204':
 *         description: No credit card registered on this user account.
 *       '500':
 *         description: Unexpected error.
 */
router.get("/{creditCardName}", auth.isUser, creditCardController.getCreditCard)

/**
 * @swagger
 * /credit-cards/{creditCardName}:
 *   put:
 *     tags:
 *       - Credit Cards
 *     name: UpdateCreditCard
 *     summary: Update a credit card
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
 *         description: Credit Card successfully updated.
 *       '500':
 *         description: Unexpected error.
 */
router.put("/{creditCardName}", auth.isUser, creditCardController.updateCreditCard)

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
router.delete("/:creditCardName", auth.isAuthed, creditCardController.deleteCreditCard);

module.exports = router;
