// Initialize express router
let router = require("express").Router();
// Import tag Controller
var technologyController = require("../controllers/technologyController");

// technology Routes
router
  .route("/technology")
  .get(technologyController.index)
  .post(technologyController.new);

router
  .route("/technology/:_id")
  .get(technologyController.view)
  .patch(technologyController.update)
  .put(technologyController.update)
  .delete(technologyController.delete);

// Export API routes
module.exports = router;
