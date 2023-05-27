// Import contact model
Client = require("../models/clientModel");
// Handle index actions
exports.index = async function (req, res) {
  console.log(Client);
  await Client.get(function (err, clients) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "success",
      message: "clients retrieved successfully",
      data: clients,
    });
  });
};

// Handle create client actions
exports.new = async function (req, res) {
  var client = new Client();
  client.email = req.body.email;
  client.name = req.body.name;
  // save the client and check for errors
  await client.save(function (err) {
    if (err) res.json(err);
    res.json({
      message: "New client created!",
      data: client,
    });
  });
};
// Handle view client info
exports.view = function (req, res) {
  console.log(req.body, req.params);
  Client.findById(req.params._id, function (err, client) {
    if (err) res.send(err);
    res.json({
      message: "client details loading..",
      data: client,
    });
  });
};
// Handle update client info
exports.update = function (req, res) {
  Client.findById(req.body._id, function (err, client) {
    if (err) res.send(err);
    client.email = req.body.data.email;
    client.name = req.body.data.name ? req.body.data.name : client.name;
    // save the client and check for errors
    client.save(function (err) {
      if (err) res.json(err);
      res.json({
        message: "client Info updated",
        data: client,
      });
    });
  });
};
// Handle delete Client
exports.delete = function (req, res) {
  Client.deleteOne(
    {
      _id: req.params._id,
    },
    function (err, client) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "client deleted",
      });
    }
  );
};
