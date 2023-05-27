var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
// Setup schema
var packageSchema = mongoose.Schema({
  package: {
    type: String,
    required: true,
    unique: true,
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
packageSchema.plugin(uniqueValidator);
// Export User model
var Package = (module.exports = mongoose.model("Packages", packageSchema));
module.exports.get = function (callback, limit) {
  Package.find(callback).limit(limit);
};
