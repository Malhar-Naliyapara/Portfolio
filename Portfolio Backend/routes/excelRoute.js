let router = require("express").Router();
var exportToExcelController = require("../controllers/exportToExcelController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router
  .route("/exportDataToExcel")
  .get(exportToExcelController.exportDataToExcel);

router
  .route("/importToDatabase")
  .post(upload.single("myFile"), exportToExcelController.importToDatabase);

// Export API routes
module.exports = router;
