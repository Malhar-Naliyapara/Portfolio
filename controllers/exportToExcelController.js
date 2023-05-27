const { readFile } = require("xlsx");
const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");

// Import models
Portfolio = require("../models/PortfolioModel");
AccessToken = require("../models/accessTokenModel");
Category = require("../models/categoryModel");
Client = require("../models/clientModel");
Package = require("../models/packagesModel");
PaymentMethod = require("../models/paymentMethodModel");
Server = require("../models/serverModel");
Tag = require("../models/tagsModel");
Technology = require("../models/technologysModel");
Theme = require("../models/themeModel");
User = require("../models/userModel");

// Handle sending all databse data to client to export into excel
exports.exportDataToExcel = async (req, res) => {
  var accessTokens = [];
  var categories = [];
  var clients = [];
  var packages = [];
  var paymentMethods = [];
  var portfolios = [];
  var servers = [];
  var tags = [];
  var technologies = [];
  var themes = [];
  var users = [];

  // Find All Access Tokens
  await AccessToken.find()
    .populate({ path: "client", select: "name -_id" })
    .populate({ path: "technology", select: "technology -_id" })
    .select(["-_id", "-createdAt", "-updatedAt", "-__v"])
    .then((accessToken, error) => {
      if (error) {
        return error.message;
      }
      accessTokens = accessToken;
    })
    .catch((error) => {
      console.log(error);
    });

  // Find All Categories
  await Category.find()
    .select(["-_id", "-createdAt", "-updatedAt", "-__v"])
    .then((category, error) => {
      if (error) {
        return error.message;
      }
      categories = category;
    })
    .catch((error) => {
      console.log(error);
    });

  // Find All Clients
  await Client.find()
    .select(["-_id", "-createdAt", "-updatedAt", "-__v"])
    .then((client, error) => {
      if (error) {
        return error.message;
      }
      clients = client;
    })
    .catch((error) => {
      console.log(error.message);
    });

  // Find All Packages
  await Package.find()
    .select(["-_id", "-createdAt", "-updatedAt", "-__v"])
    .then((package, error) => {
      if (error) {
        return error.message;
      }
      packages = package;
    })
    .catch((error) => {
      console.log(error);
    });

  // Find All Payment Methods
  await PaymentMethod.find()
    .select(["-_id", "-createdAt", "-updatedAt", "-__v"])
    .then((paymentMethod, error) => {
      if (error) {
        return error.message;
      }
      paymentMethods = paymentMethod;
    })
    .catch((error) => {
      console.log(error);
    });

  // Find All Portfolios
  await Portfolio.find()
    .select(["-_id", "-createdAt", "-updatedAt", "-__v"])
    .then((portfolio, error) => {
      if (error) {
        return error.message;
      }
      portfolios = portfolio;
    })
    .catch((error) => {
      console.log(error);
    });

  // Find All Servers
  await Server.find()
    .select(["-_id", "-createdAt", "-updatedAt", "-__v"])
    .then((server, error) => {
      if (error) {
        return error.message;
      }
      servers = server;
    })
    .catch((error) => {
      console.log(error);
    });

  // Find All Tags
  await Tag.find()
    .select(["-_id", "-createdAt", "-updatedAt", "-__v"])
    .then((tag, error) => {
      if (error) {
        return error.message;
      }
      tags = tag;
    })
    .catch((error) => {
      console.log(error);
    });

  // Find All Technologies
  await Technology.find()
    .select(["-_id", "-createdAt", "-updatedAt", "-__v"])
    .then((technology, error) => {
      if (error) {
        return error.message;
      }
      technologies = technology;
    })
    .catch((error) => {
      console.log(error);
    });

  // Find All Themes
  await Theme.find()
    .select(["-_id", "-createdAt", "-updatedAt", "-__v"])
    .then((theme, error) => {
      if (error) {
        return error.message;
      }
      themes = theme;
    })
    .catch((error) => {
      console.log(error);
    });

  // Find All Users
  await User.find()
    .select(["-_id", "-createdAt", "-updatedAt", "-__v"])
    .then((user, error) => {
      if (error) {
        return error.message;
      }
      users = user;
    })
    .catch((error) => {
      console.log(error);
    });

  res.status(200).json({
    accessTokens: accessTokens,
    categories: categories,
    clients: clients,
    packages: packages,
    paymentMethods: paymentMethods,
    portfolios: portfolios,
    servers: servers,
    tags: tags,
    technologies: technologies,
    themes: themes,
    users: users,
  });
};

// Import from excel to database
exports.importToDatabase = async (req, res) => {
  if (!req.file) {
    console.log("File not received");
    return res.send({
      message: "File not received.",
    });
  } else {
    console.log("Request of Body : ", req.file);
    file = readFile(path.join(__dirname, "..", "uploads", req.file.filename));

    portfolio = XLSX.utils.sheet_to_json(file.Sheets.portfolio);
    accessToken = XLSX.utils.sheet_to_json(file.Sheets.accessToken);
    category = XLSX.utils.sheet_to_json(file.Sheets.category);
    client = XLSX.utils.sheet_to_json(file.Sheets.client);
    packages = XLSX.utils.sheet_to_json(file.Sheets.package);
    paymentMethod = XLSX.utils.sheet_to_json(file.Sheets.paymentMethod);
    server = XLSX.utils.sheet_to_json(file.Sheets.server);
    tag = XLSX.utils.sheet_to_json(file.Sheets.tag);
    technology = XLSX.utils.sheet_to_json(file.Sheets.technology);
    theme = XLSX.utils.sheet_to_json(file.Sheets.theme);
    user = XLSX.utils.sheet_to_json(file.Sheets.user);
    console.log(file.SheetNames);
    for (let index = 0; index < portfolio.length; index++) {
      // Make Array of Category from string.
      category = portfolio[index].category.split(",");
      portfolio[index].category = category;

      // Make Array of Packages from string.
      packages = portfolio[index].package.split(",");
      portfolio[index].package = packages;

      // Make Array of Tags from string;
      tags = portfolio[index].tags.split(",");
      portfolio[index].tags = tags;
    }

    // Insert Portfolios into database.
    Portfolio.insertMany(portfolio)
      .then(() => {
        // Insert Accesstokens into database.
        return AccessToken.insertMany(accessToken).catch((error) => {
          console.log("Error in Access Token : ", error);
          throw error;
        });
      })
      .then(() => {
        // Insert Categories into database.
        return Category.insertMany(category).catch((error) => {
          console.log("Error in Category : ", error);
          throw error;
        });
      })
      .then(() => {
        // Insert Client into database.
        return Client.insertMany(client).catch((error) => {
          console.log("Error in Clients : ", error);
          throw error;
        });
      })
      .then(() => {
        // Insert Package into database.
        return Package.insertMany(packages).catch((error) => {
          console.log("Error in Packages : ", error);
          throw error;
        });
      })
      .then(() => {
        // Insert Payment Method into database.
        return PaymentMethod.insertMany(paymentMethod).catch((error) => {
          console.log("Error in Payment Methods :", error);
          throw error;
        });
      })
      .then(() => {
        // Insert Server into database.
        Server.insertMany(server).catch((error) => {
          console.log("Error in Servers : ", error);
          throw error;
        });
      })
      .then(() => {
        // Insert tag into database.
        return Tag.insertMany(tag).catch((error) => {
          console.log("Error in Tags : ", error);
          throw error;
        });
      })
      .then(() => {
        // Insert Technology into database.
        return Technology.insertMany(technology).catch((error) => {
          console.log("Error in Tachnology : ", error);
          throw error;
        });
      })
      .then(() => {
        // Insert Theme into database.
        return Theme.insertMany(theme).catch((error) => {
          console.log("Error in Theme : ", error);
          throw error;
        });
      })
      .then(() => {
        // Insert User into database.
        return User.insertMany(user).catch((error) => {
          console.log("Error in User : ", error);
          throw error;
        });
      })
      .then(() => {
        // Delete excel file that is stored for inserting data.
        fs.unlink(
          path.join(__dirname, "..", "uploads", req.file.filename),
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        );

        // Sending response to client.
        res.status(200).json({
          portfolios: portfolio,
          accessTokens: accessToken,
          categories: category,
          clients: client,
          packages: packages,
          paymentMethods: paymentMethod,
          servers: server,
          tags: tag,
          technologies: technology,
          themes: theme,
          users: user,
        });
      })
      .catch((error) => {
        console.log("Error in portfolio ", error);

        res.status(400).json(error);
      });
  }
};
