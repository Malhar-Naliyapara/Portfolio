// Initialize express router
let router = require("express").Router();
// Import tag Controller
var tagController = require("../controllers/tagController");

// tag Routes
router.route("/tags").get(tagController.index).post(tagController.new);

router
  .route("/tags/:_id")
  .get(tagController.view)
  .patch(tagController.update)
  .put(tagController.update)
  .delete(tagController.delete);

// Export API routes
module.exports = router;
