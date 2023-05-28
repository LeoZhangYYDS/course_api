const Joi = require("joi");
const mongoose = require("mongoose");
const { categorySchema } = require("./category-model");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 25,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 200,
  },
  color: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 30,
  },
  categoryId: {
    type: categorySchema,
    required: true,
  },
  publishDate: {
    type: Date,
    default: Date.now,
  },
  icon: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
});

const Course = mongoose.model("Courses", courseSchema);

function validateCourse(course) {
  const schema = Joi.object({
    title: Joi.string().min(2).max(50).required(),
    description: Joi.string().min(2).max(1000).required(),
    color: Joi.string().min(2).max(100).required(),
    icon: Joi.string().min(2).max(100).required(),
    categoryId: Joi.required(),
  });

  return schema.validate(course);
}

exports.Course = Course;
exports.validateCourse = validateCourse;
