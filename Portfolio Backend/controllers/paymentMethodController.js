// Import contact model
PaymentMethod = require("../models/paymentMethodModel");
// Handle index actions
exports.index = async function (req, res) {
  await PaymentMethod.get(function (err, paymentMethod) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "success",
      message: "paymentMethod retrieved successfully",
      data: paymentMethod,
    });
  });
};

// Handle create paymentMethod actions
exports.new = async function (req, res) {
  var paymentMethod = new PaymentMethod();
  paymentMethod.name = req.body.name;
  // save the paymentMethod and check for errors
  await paymentMethod.save(function (err) {
    if (err) res.json(err);
    res.json({
      message: "New paymentMethod created!",
      data: paymentMethod,
    });
  });
};
// Handle view paymentMethod info
exports.view = function (req, res) {
  PaymentMethod.findById(req.params._id, function (err, paymentMethod) {
    if (err) res.send(err);
    res.json({
      message: "paymentMethod details loading..",
      data: paymentMethod,
    });
  });
};
// Handle update paymentMethod info
exports.update = function (req, res) {
  PaymentMethod.findById(req.body._id, function (err, paymentMethod) {
    if (err) res.send(err);

    paymentMethod.name = req.body.data.name
      ? req.body.data.name
      : paymentMethod.name;

    // save the paymentMethod and check for errors
    paymentMethod.save(function (err) {
      if (err) res.json(err);
      res.json({
        message: "paymentMethod Info updated",
        data: paymentMethod,
      });
    });
  });
};
// Handle delete paymentMethod
exports.delete = function (req, res) {
  PaymentMethod.deleteOne(
    {
      _id: req.params._id,
    },
    function (err, paymentMethod) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "paymentMethod deleted",
      });
    }
  );
};
