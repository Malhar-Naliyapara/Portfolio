var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
// Setup schema
var technologySchema = mongoose.Schema({
  technology: {
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
technologySchema.plugin(uniqueValidator);
// Export User model
var Technology = (module.exports = mongoose.model(
  "Technology",
  technologySchema
));
module.exports.get = function (callback, limit) {
  Technology.find(callback).limit(limit);
};
