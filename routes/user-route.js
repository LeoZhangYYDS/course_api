const express = require("express");
const router = express.Router();
const usersController = require("../controllers/user-controller");
const auth = require("../middleware/auth");

router.post("/", usersController.registerUser);

router.get("/me", auth, usersController.getUserByTokenId);

module.exports = router;
