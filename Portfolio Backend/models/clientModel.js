var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
// Setup schema
var clientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
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
clientSchema.plugin(uniqueValidator);
// Export User model
var Client = (module.exports = mongoose.model("clients", clientSchema));
module.exports.get = function (callback, limit) {
  Client.find(callback).limit(limit);
};
