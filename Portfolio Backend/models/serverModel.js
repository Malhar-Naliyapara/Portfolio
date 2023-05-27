var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
// Setup schema
var serverSchema = mongoose.Schema({
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
serverSchema.plugin(uniqueValidator);
// Export User model
var Servers = (module.exports = mongoose.model("Server", serverSchema));
module.exports.get = function (callback, limit) {
  Servers.find(callback).limit(limit);
};
