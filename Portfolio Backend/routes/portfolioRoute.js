// Initialize express router
let router = require("express").Router();

const multer = require("multer");
const upload = multer({ dest: "uploads/" });
// Import package Controller
var portfolioController = require("../controllers/PortfolioController");

// package Routes
router
  .route("/portfolios")
  .get(portfolioController.index)
  .post(upload.single("image"), portfolioController.new);

router
  .route("/portfolios/:_id")
  .get(portfolioController.view)
  .patch(portfolioController.update)
  .put(upload.single("image"), portfolioController.update)
  .delete(portfolioController.delete);

// Export API routes
module.exports = router;
