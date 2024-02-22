const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mobileModelQuantitySchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  colors: [
    {
      colorName: {
        type: String,
        required: true
      },
      capacity: {
        "128": {
          quantity: {
            type: Number,
            required: true
          },
          productId: {
            type: String,
            required: true
          }
        },
        "256": {
          quantity: {
            type: Number,
            required: true
          },
          productId: {
            type: String,
            required: true
          }
        },
        "512": {
          quantity: {
            type: Number,
            required: true
          },
          productId: {
            type: String,
            required: true
          }
        }
      }
    }
  ]
});

mobileModelQuantitySchema.index({ "$**": "text" });

module.exports = MobileModelQuantity = mongoose.model("mobile-model-quantity", mobileModelQuantitySchema);