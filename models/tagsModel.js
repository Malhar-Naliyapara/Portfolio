var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
// Setup schema
var tagSchema = mongoose.Schema({
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
tagSchema.plugin(uniqueValidator);
// Export User model
var Tags = (module.exports = mongoose.model("Tags", tagSchema));
module.exports.get = function (callback, limit) {
  Tags.find(callback).limit(limit);
};
