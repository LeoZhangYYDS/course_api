const express = require("express");
const router = express.Router();
const coursesController = require("../controllers//course-controller");

router.get("/", coursesController.getAllCourses);
router.post("/", coursesController.postCourses);
router.put("/:id", coursesController.putCourses);
router.delete("/:id", coursesController.deleteCousrsesById);
router.get("/:id", coursesController.getCoursesById);

module.exports = router;
