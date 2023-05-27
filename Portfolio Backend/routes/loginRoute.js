// Initialize express router
let router = require("express").Router();

// Import user Controller
var userController = require("../controllers/userController");

router.route("/login").post(userController.userLogin);

// Export API routes
module.exports = router;
