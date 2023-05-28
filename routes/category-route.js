//Required modules
const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/category-controller");

router.get("/", categoriesController.getAllCategories);

router.post("/", categoriesController.postCategories);

router.put("/:id", categoriesController.putCategories);

router.delete("/:id", categoriesController.deleteCategories);

router.get("/:id", categoriesController.getCategoriesById);

//Export Router
module.exports = router;
