var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
// Setup schema
var categorySchema = mongoose.Schema({
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
categorySchema.plugin(uniqueValidator);
// Export User model
var Category = (module.exports = mongoose.model("categories", categorySchema));
module.exports.get = function (callback, limit) {
  Category.find(callback).limit(limit);
};
