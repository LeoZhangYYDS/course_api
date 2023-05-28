const { Course, validateCourse } = require("../models/course-model");
const { Category } = require("../models/category-model");

module.exports = {
  async getAllCourses(req, res) {
    const courses = await Course.find({}).sort("name");
    res.send(courses);
  },
  async postCourses(req, res) {
    let { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const category = await Category.findById(req.body.categoryId);
    if (!category)
      return res
        .status(404)
        .send("The category with the given ID was not found");

    let course = new Course({
      title: req.body.title,
      description: req.body.description,
      color: req.body.color,
      icon: req.body.icon,
      categoryId: {
        _id: category._id,
        name: category.name,
      },
    });
    course = await course.save();
    res.send(course);
  },
  async putCourses(req, res) {
    let { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const category = await Category.findById(req.body.categoryId);
    if (!category) return res.status(400).send("Invalid category.");

    const course = await Course.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        color: req.body.color,
        icon: req.body.icon,
        categoryId: {
          _id: category._id,
          name: category.name,
        },
      },
      { new: true }
    );
    if (!course) {
      return res
        .status(404)
        .send("The course with the given ID was not found.");
    }

    res.send(course);
  },
  async deleteCousrsesById(req, res) {
    const course = await Course.findByIdAndRemove(req.params.id);
    if (!course)
      return res.status(404).send("The course with the given ID was not found");

    res.send(course);
  },
  async getCoursesById(req, res) {
    const course = await Course.findById(req.params.id);
    if (!course)
      return res.status(404).send("The course with the given ID was not found");
    res.send(course);
  },
};
