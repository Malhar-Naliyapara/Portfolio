// Initialize express router
let router = require("express").Router();

// Import user Controller
var accessTokenController = require("../controllers/accessTokenController");

// User Routes
router
  .route("/accessToken")
  .get(accessTokenController.index)
  .post(accessTokenController.new);

router
  .route("/accessToken/:_id")
  .get(accessTokenController.view)
  .patch(accessTokenController.update)
  .put(accessTokenController.update)
  .delete(accessTokenController.delete);

router.route("/global").get(accessTokenController.globalSerach);

// Export API routes
module.exports = router;
