// Initialize express router
let router = require("express").Router();
// Import theme Controller
var themeController = require("../controllers/themeController");

// theme Routes
router.route("/themes").get(themeController.index).post(themeController.new);

router
  .route("/themes/:_id")
  .get(themeController.view)
  .patch(themeController.update)
  .put(themeController.update)
  .delete(themeController.delete);

// Export API routes
module.exports = router;
