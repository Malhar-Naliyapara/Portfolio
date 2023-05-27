// Import contact model
Package = require("../models/packagesModel");
// Handle index actions
exports.index = async function (req, res) {
  await Package.get(function (err, package) {
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

// Handle create package actions
exports.new = async function (req, res) {
  var package = new Package();
  package.package = req.body.package;
  // save the package and check for errors
  await package.save(function (err) {
    if (err) res.json(err);
    res.json({
      message: "New package created!",
      data: package,
    });
  });
};
// Handle view package info
exports.view = function (req, res) {
  Package.findById(req.params._id, function (err, package) {
    if (err) res.send(err);
    res.json({
      message: "package details loading..",
      data: package,
    });
  });
};
// Handle update package info
exports.update = function (req, res) {
  Package.findById(req.body._id, function (err, package) {
    if (err) res.send(err);
    package.package = req.body.data.package
      ? req.body.data.package
      : package.package;
    // save the package and check for errors
    package.save(function (err) {
      if (err) res.json(err);
      res.json({
        message: "package Info updated",
        data: package,
      });
    });
  });
};
// Handle delete package
exports.delete = function (req, res) {
  Package.deleteOne(
    {
      _id: req.params._id,
    },
    function (err, package) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "package deleted",
      });
    }
  );
};
