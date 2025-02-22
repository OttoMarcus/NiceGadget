const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    orderNo: {
      type: String,
      required: true
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "customers"
    },
    products: [
      {
        type: Schema.Types.Mixed,
        required: true
      }
    ],
    deliveryAddress: {
      type: String,
      required: true
    },
    deliveryMethod: {
      type: String,
      required: true
    },
    paymentMethod: {
      type: String,
      required: true
    },
    totalSum: {
      type: Number,
      required: true
    },
    canceled: {
      type: Boolean,
      default: false
    },
    status: {
      type: String
    },
    email: {
      type: String,
      required: true
    },
    mobile: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { strict: false }
);

module.exports = Order = mongoose.model("orders", OrderSchema);
