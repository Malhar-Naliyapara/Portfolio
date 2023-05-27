// Import contact model
AccessToken = require("../models/accessTokenModel");
// Handle index actions
exports.index = async function (req, res) {
  await AccessToken.find().exec(function (err, accessTokens) {
    if (err) {
      console.log(err);
      return res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "success",
      message: "accessTokens retrieved successfully",
      data: accessTokens,
    });
  });
};

// Handle create accessToken actions
exports.new = async function (req, res) {
  var accessToken = new AccessToken();
  console.log(req.body);
  accessToken.token = req.body.token;
  accessToken.url = req.body.url;
  accessToken.technology = req.body.technology;
  accessToken.client = req.body.client;
  accessToken.status = req.body.status;
  // save the category and check for errors
  await accessToken.save(function (err) {
    if (err) res.json(err);
    res.json({
      message: "New accessToken created!",
      data: accessToken,
    });
  });
};
// Handle view accessToken info
exports.view = function (req, res) {
  console.log(req.params._id);
  AccessToken.findById(req.params._id).exec(function (err, accessToken) {
    if (err) return console.log(err);
    res.json({
      message: "accessToken details loading..",
      data: accessToken,
    });
  });
};
// Handle update accessToken info
exports.update = function (req, res) {
  AccessToken.findById(req.body._id, function (err, accessToken) {
    if (err) return console.log(err);
    accessToken.token = req.body.data.token
      ? req.body.data.token
      : accessToken.token;
    accessToken.url = req.body.data.url ? req.body.data.url : accessToken.url;
    accessToken.technology = req.body.data.technology
      ? req.body.data.technology
      : accessToken.technology;
    accessToken.client = req.body.data.client
      ? req.body.data.client
      : accessToken.client;
    accessToken.status = req.body.data.status
      ? req.body.data.status
      : accessToken.status;
    // save the accessToken and check for errors
    accessToken.save(function (err) {
      if (err) res.json(err);
      res.json({
        message: "accessToken Info updated",
        data: accessToken,
      });
    });
  });
};
// Handle delete AccessToken
exports.delete = function (req, res) {
  AccessToken.deleteOne(
    {
      _id: req.params._id,
    },
    function (err, accessToken) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "accessToken deleted",
      });
    }
  );
};

exports.globalSerach = async function (req, res) {
  await AccessToken.find()
    .populate(["client", "technology"])
    .exec(function (err, accessTokens) {
      if (err) {
        console.log(err);
        return res.json({
          status: "error",
          message: err,
        });
      }
      res.json({
        status: "success",
        message: "accessTokens retrieved successfully",
        data: accessTokens,
      });
    });
};

exports.clientFilter = async function (req, res) {
  AccessToken.find()
    .populate("technology")
    .populate("client")
    .then((res111) => {
      const x = res111.filter(
        (key) =>
          key.client.name.match(/ggg/gi) ||
          key.technology.technology.match(/dcf/gi)
      );
      x.length > 0 ? res.send(x) : res.send("error");
    });
};
