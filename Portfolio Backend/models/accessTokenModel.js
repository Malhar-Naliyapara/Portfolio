var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
// Setup schema
var accessTokenSchema = mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
  },
  // client: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "clients",
  // },
  // technology: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Technology",
  // },
  client: {
    type: String,
    required: true,
  },
  technology: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
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
accessTokenSchema.plugin(uniqueValidator);
// Export User model
var AccessToken = (module.exports = mongoose.model(
  "AccessToken",
  accessTokenSchema
));
module.exports.get = function (callback, limit) {
  AccessToken.find(callback).limit(limit);
};
