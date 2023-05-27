const path = require("path");
const fs = require("fs");

// Import models
Portfolio = require("../models/PortfolioModel");

// Handle index actions
exports.index = async function (req, res) {
  await Portfolio.get(function (err, portfolio) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "success",
      message: "portfolios retrieved successfully",
      data: portfolio,
    });
  });
};

// Handle create portfolio actions
exports.new = async function (req, res) {
  const body = JSON.parse(req.body.data);
  const file = req.file;
  var portfolio = new Portfolio();
  const pathToFile = path.join(
    `${__dirname}, ".." , "uploads", ${file.filename}`
  );
  console.log(file);
  const fileURL = new URL(
    `./uploads/${file.filename}`,
    `${req.protocol}://${req.get("host")}${req.originalUrl}`
  ).href;

  portfolio.title = body.title;
  portfolio.clientName = body.clientName;
  portfolio.content = body.content;
  portfolio.category = body.category;
  portfolio.technology = body.technology;
  portfolio.tags = body.tags;
  portfolio.webServer = body.webServer;
  portfolio.theme = body.theme;
  portfolio.package = body.package;
  portfolio.paymentMethod = body.paymentMethod;
  portfolio.multiTheme = body.multiTheme;
  portfolio.multiSite = body.multiSite;
  portfolio.siteDevelopmentDuration = body.siteDevelopmentDuration;
  portfolio.addOn = body.addOn;
  portfolio.siteLink = body.siteLink;
  portfolio.image = fileURL;
  portfolio.displayIndex = body.displayIndex;
  portfolio.projectClosed = body.projectClosed;
  portfolio.status = body.status;
  portfolio.notes = body.notes;
  await portfolio.save(function (err) {
    if (err) {
      return console.log(err);
    }
    res.json({
      message: "New portfolio created!",
      data: portfolio,
    });
  });

  // save the portfolio and check for errors
};
// Handle view portfolio info
exports.view = function (req, res) {
  Portfolio.findById(req.params._id, function (err, portfolio) {
    if (err) res.send(err);
    res.json({
      message: "portfolio details loading..",
      data: portfolio,
    });
  });
};
// Handle update portfolio info
exports.update = function (req, res) {
  const body = JSON.parse(req.body.data);
  const file = req.file;
  const pathToFile = path.join(__dirname, "..", "uploads", file.filename);
  const fileURL = new URL(
    `./uploads/${file.filename}`,
    `${req.protocol}://${req.get("host")}`
  ).href;
  Portfolio.findById(body._id, function (err, portfolio) {
    if (err) console.log(err);
    oldImageNameArray = portfolio.image.split("/");
    fs.unlink(
      path.join(
        __dirname,
        "..",
        "uploads",
        oldImageNameArray[oldImageNameArray.length - 1]
      ),
      (err) => {
        if (err) {
          console.log(err);
        } else
          console.log(
            oldImageNameArray[oldImageNameArray.length - 1],
            " File is deleted."
          );
      }
    );

    portfolio.title = body.data.title;
    portfolio.clientName = body.data.clientName;
    portfolio.content = body.data.content;
    portfolio.category = body.data.category;
    portfolio.technology = body.data.technology;
    portfolio.tags = body.data.tags;
    portfolio.webServer = body.data.webServer;
    portfolio.theme = body.data.theme;
    portfolio.package = body.data.package;
    portfolio.paymentMethod = body.data.paymentMethod;
    portfolio.multiTheme = body.data.multiTheme;
    portfolio.multiSite = body.data.multiSite;
    portfolio.siteDevelopmentDuration = body.data.siteDevelopmentDuration;
    portfolio.addOn = body.data.addOn;
    portfolio.siteLink = body.data.siteLink;
    portfolio.image = fileURL;
    portfolio.displayIndex = body.data.displayIndex;
    portfolio.projectClosed = body.data.projectClosed;
    portfolio.status = body.data.status;
    portfolio.notes = body.data.notes;
    // save the portfolio and check for errors
    portfolio.save(function (err) {
      if (err) return console.log(err);
    });
    res.json({
      message: "portfolio Info updated",
      data: portfolio,
    });
  });
};
// Handle delete portfolio
exports.delete = function (req, res) {
  Portfolio.findOneAndDelete(
    {
      _id: req.params._id,
    },
    function (err, portfolio) {
      if (err) res.send(err);

      // Deleting old Image from server.
      oldImageNameArray = portfolio.image.split("/");
      fs.unlink(
        path.join(
          __dirname,
          "..",
          "uploads",
          oldImageNameArray[oldImageNameArray.length - 1]
        ),
        (err) => {
          if (err) {
            console.log(err);
          } else
            console.log(
              oldImageNameArray[oldImageNameArray.length - 1],
              " File is deleted."
            );
        }
      );
    }
  );

  res.json({
    status: "success",
    message: "portfolio deleted",
  });
};
