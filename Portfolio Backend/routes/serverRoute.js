// Initialize express router
let router = require("express").Router();
// Import server Controller
var serverController = require("../controllers/serverController");

// server Routes
router.route("/servers").get(serverController.index).post(serverController.new);

router
  .route("/servers/:_id")
  .get(serverController.view)
  .patch(serverController.update)
  .put(serverController.update)
  .delete(serverController.delete);

// Export API routes
module.exports = router;
