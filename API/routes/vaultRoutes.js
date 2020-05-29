const express = require("express");
const router = express.Router();

const vaultController = require("../controllers/vaultController")

const auth = require("../middlewares/auth");

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