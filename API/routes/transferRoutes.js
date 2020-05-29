const express = require("express");
const router = express.Router();

const transferController = require("../controllers/transferController")

const auth = require("../middlewares/auth");

/**
 * @swagger
 * /transfer:
 *   get:
 *     tags:
 *       - Transfer
 *     name: GetUserTransfers
 *     summary: Get user transfer logs
 *     responses:
 *       '200':
 *         description: Transfer logs retrieved.
 *       '404':
 *         description: No transfers were found on this account.
 *       '500':
 *         description: Unexpected error.
 */
router.get(
    "/",
    auth.isAuthed,
    transferController.getTransfers
);

/**
 * @swagger
 * /transfer:
 *   post:
 *     tags:
 *       - Transfer
 *     name: RegisterUserNewTransfer
 *     summary: Request a new transfer for the user.
 *     requestBody:
 *       $ref: '#/components/requestBodies/TransferRegister'
 *     responses:
 *       '201':
 *         description: Transfer request created.
 *       '500':
 *         description: Unexpected error.
 */
router.post(
    "/",
    auth.isAuthed,
    transferController.registerTransfer
);

/**
 * @swagger
 * /transfer:
 *   delete:
 *     tags:
 *       - Transfer
 *     name: RemoveUserRequest
 *     summary: Cancel a user request not processed yet.
 *     responses:
 *       '200':
 *         description: Succesfully deleted transfer request.
 *       '404':
 *         description: No transfer with this id exist on this user account.
 *       '500':
 *         description: Unexpected error.
 */
router.delete(
    "/",
    auth.isAuthed,
    transferController.deleteTransfer
);

module.exports = router;