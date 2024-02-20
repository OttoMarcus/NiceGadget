const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    parentId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    }
  },
  name: {
    type: String,
    required: true
  },
  capacity: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    required: false
  },
  ram: {
    type: String,
    required: true
  },
  screen: {
    type: String,
    required: true
  },
  brandNew: {
    type: Boolean,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  refModel: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    required: true
  }
});

itemSchema.index({ "$**": "text" });

module.exports = item = mongoose.model("products", itemSchema);