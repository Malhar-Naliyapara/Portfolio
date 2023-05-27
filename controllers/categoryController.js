// Import contact model
Category = require("../models/categoryModel");
// Handle index actions
exports.index = async function (req, res) {
  await Category.get(function (err, categories) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "success",
      message: "Categories retrieved successfully",
      data: categories,
    });
  });
};

// Handle create category actions
exports.new = async function (req, res) {
  var category = new Category();
  category.name = req.body.name ? req.body.name : category.name;
  // save the category and check for errors
  await category.save(function (err) {
    if (err) res.json(err);
    res.json({
      message: "New Category created!",
      data: category,
    });
  });
};
// Handle view category info
exports.view = function (req, res) {
  Category.findById(req.params._id, function (err, category) {
    if (err) res.send(err);
    res.json({
      message: "Category details loading..",
      data: category,
    });
  });
};
// Handle update category info
exports.update = function (req, res) {
  Category.findById(req.body._id, function (err, category) {
    if (err) res.send(err);
    category.name = req.body.data.name ? req.body.data.name : category.name;
    // save the category and check for errors
    category.save(function (err) {
      if (err) res.json(err);
      res.json({
        message: "Category Info updated",
        data: category,
      });
    });
  });
};
// Handle delete category
exports.delete = function (req, res) {
  Category.deleteOne(
    {
      _id: req.params._id,
    },
    function (err, category) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "Category deleted",
      });
    }
  );
};
