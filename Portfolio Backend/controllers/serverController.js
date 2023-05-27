// Import contact model
Server = require("../models/serverModel");
// Handle index actions
exports.index = async function (req, res) {
  await Server.get(function (err, package) {
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

// Handle create server actions
exports.new = async function (req, res) {
  var server = new Server();
  server.name = req.body.name;
  // save the server and check for errors
  await server.save(function (err) {
    if (err) res.json(err);
    res.json({
      message: "New server created!",
      data: server,
    });
  });
};
// Handle view server info
exports.view = function (req, res) {
  Server.findById(req.params._id, function (err, server) {
    if (err) res.send(err);
    res.json({
      message: "server details loading..",
      data: server,
    });
  });
};
// Handle update package info
exports.update = function (req, res) {
  Server.findById(req.body._id, function (err, server) {
    if (err) res.send(err);
    server.name = req.body.data.name ? req.body.data.name : server.name;
    // save the server and check for errors
    server.save(function (err) {
      if (err) res.json(err);
      res.json({
        message: "server Info updated",
        data: server,
      });
    });
  });
};
// Handle delete package
exports.delete = function (req, res) {
  Server.deleteOne(
    {
      _id: req.params._id,
    },
    function (err, server) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "server deleted",
      });
    }
  );
};
