// Initialize express router
let router = require("express").Router();

// Import user Controller
var categoryController = require("../controllers/categoryController");

// User Routes
router
  .route("/category")
  .get(categoryController.index)
  .post(categoryController.new);

router
  .route("/category/:_id")
  .get(categoryController.view)
  .patch(categoryController.update)
  .put(categoryController.update)
  .delete(categoryController.delete);

// Export API routes
module.exports = router;
