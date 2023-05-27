var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
// Setup schema
var themeSchema = mongoose.Schema({
  name: {
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
themeSchema.plugin(uniqueValidator);
// Export User model
var Theme = (module.exports = mongoose.model("Theme", themeSchema));
module.exports.get = function (callback, limit) {
  Theme.find(callback).limit(limit);
};
