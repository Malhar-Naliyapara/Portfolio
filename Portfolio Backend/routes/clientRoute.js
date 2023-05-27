// Initialize express router
let router = require("express").Router();
// Import client Controller
var clientController = require("../controllers/clientController");

// client Routes
router.route("/clients").get(clientController.index).post(clientController.new);

router
  .route("/clients/:_id")
  .get(clientController.view)
  .patch(clientController.update)
  .put(clientController.update)
  .delete(clientController.delete);

// Export API routes
module.exports = router;
