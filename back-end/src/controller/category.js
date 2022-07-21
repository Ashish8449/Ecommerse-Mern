const slugify = require("slugify");
const Category = require("../models/category");
exports.createCategory = async (req, res) => {
  try {
    const categoryObj = {
      name: req.body.name,
      slug: slugify(req.body.name),
    };
    if (req.body.parentId) {
      categoryObj.parentId = req.body.parentId;
    }
    const cat = new Category(categoryObj);
    await cat.save();
    res.status(400).json(cat);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
