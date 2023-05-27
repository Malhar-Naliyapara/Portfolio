// Import express
let express = require("express");
// Import Body parser
let bodyParser = require("body-parser");
// Import Mongoose
let mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const auth = require("./utils/authentication");

let dotenv = require("dotenv");
dotenv.config();
// Initialise the app
let app = express();

// Cors Policy
app.use(
  cors({
    origin: "*",
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/store", express.static(path.join(__dirname, "store")));
// Import routes
let loginRoute = require("./routes/loginRoute");
let userRoutes = require("./routes/userRoutes");
let categoryRoutes = require("./routes/categoryRoutes");
let clientRoutes = require("./routes/clientRoute");
let packageRoutes = require("./routes/packageRoute");
let paymentMethodRoute = require("./routes/paymentMethodRoute");
let tagsRoutes = require("./routes/tagsRoute");
let portfolioRoute = require("./routes/portfolioRoute");
let technologyRoute = require("./routes/technologyRoute");
let serverRoute = require("./routes/serverRoute");
let accessTokenRoute = require("./routes/accessTokenRoute");
let themeRoute = require("./routes/themeRoutes");
let excelRoute = require("./routes/excelRoute");

// Configure bodyparser to handle post requests
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database.");
  })
  .catch(() => {
    console.log("Error in connecting to the database.");
  });

// Setup server port
var port = process.env.PORT || 3000;

// console.log(process.env.PORT);
// Send message for default URL
app.get("/", (req, res) => res.send("Hello World with Express"));

// Use Api routes in the App
app.use(loginRoute);
app.use(auth.jwtVerify, userRoutes);
app.use(auth.jwtVerify, categoryRoutes);
app.use(auth.jwtVerify, clientRoutes);
app.use(auth.jwtVerify, packageRoutes);
app.use(auth.jwtVerify, paymentMethodRoute);
app.use(auth.jwtVerify, tagsRoutes);
app.use(auth.jwtVerify, portfolioRoute);
app.use(auth.jwtVerify, technologyRoute);
app.use(auth.jwtVerify, serverRoute);
app.use(auth.jwtVerify, accessTokenRoute);
app.use(auth.jwtVerify, themeRoute);
app.use(auth.jwtVerify, excelRoute);
// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running Portfolio Admin API on " + `http://localhost:${port}`);
});
