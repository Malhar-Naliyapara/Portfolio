var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
// Setup schema
var portfolioSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: Object,
    required: true,
  },
  technology: {
    type: String,
    required: true,
  },
  tags: {
    type: Object,
    required: true,
  },
  webServer: {
    type: String,
    required: true,
  },
  theme: {
    type: Object,
    required: true,
  },
  package: {
    type: Object,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  multiTheme: {
    type: Boolean,
    required: true,
  },
  multiSite: {
    type: Boolean,
    required: true,
  },
  siteDevelopmentDuration: {
    type: String,
    required: true,
  },
  addOn: {
    type: String,
    required: true,
  },
  siteLink: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  displayIndex: {
    type: Number,
    required: true,
  },
  projectClosed: {
    type: Boolean,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
portfolioSchema.plugin(uniqueValidator);
// Export User model
var Portfolio = (module.exports = mongoose.model("portfolio", portfolioSchema));
module.exports.get = function (callback, limit) {
  Portfolio.find(callback).limit(limit);
};
