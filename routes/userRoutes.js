// Initialize express router
let router = require("express").Router();

// Import user Controller
var userController = require("../controllers/userController");

// User Routes
router.route("/users").get(userController.index);
router.route("/users").post(userController.new);

router
  .route("/users/:_id")
  .get(userController.view)
  .patch(userController.update)
  .put(userController.update)
  .delete(userController.delete);

// Export API routes
module.exports = router;
