const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mobileModelSchema = new Schema({
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
      pictures: [
        {
          alt: {
            type: String,
            required: true
          },
          link: {
            type: String,
            required: true
          }
        }
      ],
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
      hexColor: {
        type: String,
        required: true
      }
    }
  ],

  techSpecs: {
    screen: {
      type: String,
      required: true
    },
    resolution: {
      type: String,
      required: true
    },
    processor: {
      type: String,
      required: true
    },
    ram: {
      type: String,
      required: true
    },
    camera: {
      type: String,
      required: true
    },
    zoom: {
      type: String,
      required: true
    },
    cell: {
      type: String,
      required: true
    }

  },
  about: {
    type: [{
      title: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      },
    }],
    required: true
  },
  recommendations: {
    type: [{
      id: {
        type: String,
        required: true
      }
    }],
    default: [],
    required: false
  },
});

mobileModelSchema.index({ "$**": "text" });

module.exports = MobileModel = mongoose.model("mobileModel", mobileModelSchema);