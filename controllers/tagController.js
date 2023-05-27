// Import contact model
Tags = require("../models/tagsModel");
// Handle index actions
exports.index = async function (req, res) {
  await Tags.get(function (err, package) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "success",
      message: "package retrieved successfully",
      data: package,
    });
  });
};

// Handle create tag actions
exports.new = async function (req, res) {
  var tag = new Tags();
  tag.name = req.body.name;
  // save the tag and check for errors
  await tag.save(function (err) {
    if (err) res.json(err);
    res.json({
      message: "New tag created!",
      data: tag,
    });
  });
};
// Handle view tag info
exports.view = function (req, res) {
  Tags.findById(req.params._id, function (err, tag) {
    if (err) res.send(err);
    res.json({
      message: "tag details loading..",
      data: tag,
    });
  });
};
// Handle update package info
exports.update = function (req, res) {
  Tags.findById(req.body._id, function (err, tag) {
    if (err) res.send(err);
    tag.name = req.body.data.name ? req.body.data.name : tag.name;
    // save the tag and check for errors
    tag.save(function (err) {
      if (err) res.json(err);
      res.json({
        message: "tag Info updated",
        data: tag,
      });
    });
  });
};
// Handle delete package
exports.delete = function (req, res) {
  Tags.deleteOne(
    {
      _id: req.params._id,
    },
    function (err, tag) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "tag deleted",
      });
    }
  );
};
