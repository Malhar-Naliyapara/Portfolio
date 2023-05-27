var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
// Setup schema
var paymentMethodSchema = mongoose.Schema({
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
paymentMethodSchema.plugin(uniqueValidator);
// Export User model
var PaymentMethod = (module.exports = mongoose.model(
  "PaymentMethod",
  paymentMethodSchema
));
module.exports.get = function (callback, limit) {
  PaymentMethod.find(callback).limit(limit);
};
