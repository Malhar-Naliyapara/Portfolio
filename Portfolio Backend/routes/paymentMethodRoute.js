// Initialize express router
let router = require("express").Router();
// Import package Controller
var paymentMethodController = require("../controllers/paymentMethodController");

// paymentMethod Routes
router
  .route("/paymentMethods")
  .get(paymentMethodController.index)
  .post(paymentMethodController.new);

router
  .route("/paymentMethods/:_id")
  .get(paymentMethodController.view)
  .patch(paymentMethodController.update)
  .put(paymentMethodController.update)
  .delete(paymentMethodController.delete);

// Export API routes
module.exports = router;
