// Import contact model
Theme = require("../models/themeModel");
// Handle index actions
exports.index = async function (req, res) {
  await Theme.get(function (err, theme) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "success",
      message: "theme retrieved successfully",
      data: theme,
    });
  });
};

// Handle create theme actions
exports.new = async function (req, res) {
  var theme = new Theme();
  theme.name = req.body.name;
  // save the theme and check for errors
  await theme.save(function (err) {
    if (err) res.json(err);
    res.json({
      message: "New theme created!",
      data: theme,
    });
  });
};
// Handle view theme info
exports.view = function (req, res) {
  Theme.findById(req.params._id, function (err, theme) {
    if (err) res.send(err);
    res.json({
      message: "theme details loading..",
      data: theme,
    });
  });
};
// Handle update theme info
exports.update = function (req, res) {
  Theme.findById(req.body._id, function (err, theme) {
    if (err) res.send(err);
    theme.name = req.body.data.name ? req.body.data.name : theme.name;
    // save the theme and check for errors
    theme.save(function (err) {
      if (err) res.json(err);
      res.json({
        message: "theme Info updated",
        data: theme,
      });
    });
  });
};
// Handle delete theme
exports.delete = function (req, res) {
  Theme.deleteOne(
    {
      _id: req.params._id,
    },
    function (err, theme) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "theme deleted",
      });
    }
  );
};
