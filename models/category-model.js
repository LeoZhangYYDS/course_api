const mongoose = require("mongoose");
const Joi = require("joi");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 50,
    trim: true,
  },
});
const Category = mongoose.model("Categories", categorySchema);

function validateCategory(category) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(50).required(),
  });
  return schema.validate(category);
}

module.exports.Category = Category;
module.exports.validateCategory = validateCategory;
module.exports.categorySchema = categorySchema;
