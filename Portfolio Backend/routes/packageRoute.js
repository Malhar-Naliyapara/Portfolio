// Initialize express router
let router = require("express").Router();
// Import package Controller
var packageController = require("../controllers/packagesController");

// package Routes
router
  .route("/packages")
  .get(packageController.index)
  .post(packageController.new);

router
  .route("/packages/:_id")
  .get(packageController.view)
  .patch(packageController.update)
  .put(packageController.update)
  .delete(packageController.delete);

// Export API routes
module.exports = router;
