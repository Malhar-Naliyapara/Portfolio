// Import contact model
Technology = require("../models/technologysModel");
// Handle index actions
exports.index = async function (req, res) {
  await Technology.get(function (err, technology) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "success",
      message: "technology retrieved successfully",
      data: technology,
    });
  });
};

// Handle create technology actions
exports.new = async function (req, res) {
  console.log(req.body);
  var technology = new Technology();
  technology.technology = req.body.technology;
  // save the technology and check for errors
  await technology.save(function (err) {
    if (err) res.json(err);
    res.json({
      message: "New technology created!",
      data: technology,
    });
  });
};
// Handle view technology info
exports.view = function (req, res) {
  Technology.findById(req.params._id, function (err, technology) {
    if (err) res.send(err);
    res.json({
      message: "technology details loading..",
      data: technology,
    });
  });
};
// Handle update technology info
exports.update = function (req, res) {
  Technology.findById(req.body._id, function (err, technology) {
    if (err) res.send(err);
    technology.technology = req.body.data.technology
      ? req.body.data.technology
      : technology.technology;
    // save the technology and check for errors
    technology.save(function (err) {
      if (err) res.json(err);
      res.json({
        message: "technology Info updated",
        data: technology,
      });
    });
  });
};
// Handle delete technology
exports.delete = function (req, res) {
  Technology.deleteOne(
    {
      _id: req.params._id,
    },
    function (err, technology) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "technology deleted",
      });
    }
  );
};
