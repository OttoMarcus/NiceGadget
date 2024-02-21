const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mobileModelAmountSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  colors: [
    {
      colorName: {
        type: String,
        required: true
      },
      capacity: {
        "128": {
          price: {
            type: Number,
            required: true,
          },
          available: {
            type: Boolean,
            required: true,
            default: true,
          },
          id: {
            type: String,
            required: true,
          },
          discount: {
            type: Number,
            required: false,
          },
        },
        "256": {
          price: {
            type: Number,
            required: true,
          },
          available: {
            type: Boolean,
            required: true,
            default: true,
          },
          id: {
            type: String,
            required: true,
          },
          discount: {
            type: Number,
            required: false,
          },
        },
        "512": {
          price: {
            type: Number,
            required: true,
          },
          available: {
            type: Boolean,
            required: true,
            default: true,
          },
          id: {
            type: String,
            required: true,
          },
          discount: {
            type: Number,
            required: false,
          },
        }
      },
    }
  ],
});

mobileModelAmountSchema.index({ "$**": "text" });

module.exports = mobileModelAmount = mongoose.model("products", mobileModelAmountSchema);