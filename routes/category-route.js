//Required modules
const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/category-controller");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", categoriesController.getAllCategories);

router.post("/", [auth, admin], categoriesController.postCategories);

router.put("/:id", [auth, admin], categoriesController.putCategories);

router.delete("/:id", [auth, admin], categoriesController.deleteCategories);

router.get("/:id", categoriesController.getCategoriesById);

//Export Router
module.exports = router;
