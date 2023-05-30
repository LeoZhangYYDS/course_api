const express = require("express");
const router = express.Router();
const coursesController = require("../controllers//course-controller");
const auth = require("../middleware/auth");
const teacher = require("../middleware/teacher");

router.get("/", coursesController.getAllCourses);
router.post("/", [auth, teacher], coursesController.postCourses);
router.put("/:id", [auth, teacher], coursesController.putCourses);
router.delete("/:id", [auth, teacher], coursesController.deleteCousrsesById);
router.get("/:id", coursesController.getCoursesById);

module.exports = router;
