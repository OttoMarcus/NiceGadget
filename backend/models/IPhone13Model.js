const mongoose = require("mongoose");
const Schema = mongoose.Schema;

IPhone13Model
const IPhone13ModelSchema = new Schema(
  {
    id: {
      type: String,
      required: true
    },
    variations: {
      blue: {
        pictures: {
          "1": {
            type: String,
            required: true
          },
          "2": {
            type: String,
            required: true
          },
          "3": {
            type: String,
            required: true
          },
          "4": {
            type: String,
            required: true
          },
          "5": {
            type: String,
            required: true
          }
        },
        capacity: {
          "128": {
            price: {
              type: Number,
              required: true,
              default: 700,
            },
            amount: {
              available: true
              type: Number,
              default: 20
            },
            id: 12312
          },
          "256": {
            price: {
              type: Number,
              required: true,
              default: 750
            },
            amount: {
              type: Number,
              default: 20
            }
            id
          },
          "512": {
            price: {
              type: Number,
              required: true,
              default: 790
            },
            amount: {
              type: Number,
              default: 20
            }
          }
        },
        hexColor: {
          type: String,
          required: true
        }
      },
      midnight: {
        pictures: {
          "1": {
            type: String,
            required: true
          },
          "2": {
            type: String,
            required: true
          },
          "3": {
            type: String,
            required: true
          },
          "4": {
            type: String,
            required: true
          },
          "5": {
            type: String,
            required: true
          }
        },
        capacity: {
          "128": {
            price: {
              type: Number,
              required: true,
              default: 700
            },
            amount: {
              type: Number,
              default: 20
            }
          },
          "256": {
            price: {
              type: Number,
              required: true,
              default: 750
            },
            amount: {
              type: Number,
              default: 20
            }
          },
          "512": {
            price: {
              type: Number,
              required: true,
              default: 790
            },
            amount: {
              type: Number,
              default: 20
            }
          }
        },
        hexColor: String
      },
      red: {
        pictures: {
          "1": {
            type: String,
            required: true
          },
          "2": {
            type: String,
            required: true
          },
          "3": {
            type: String,
            required: true
          },
          "4": {
            type: String,
            required: true
          },
          "5": {
            type: String,
            required: true
          }
        },
        capacity: {
          "128": {
            price: {
              type: Number,
              required: true,
              default: 700
            },
            amount: {
              type: Number,
              default: 20
            }
          },
          "256": {
            price: {
              type: Number,
              required: true,
              default: 750
            },
            amount: {
              type: Number,
              default: 20
            }
          },
          "512": {
            price: {
              type: Number,
              required: true,
              default: 790
            },
            amount: {
              type: Number,
              default: 20
            }
          }
        },
        hexColor: String
      },
      starlight: {
        pictures: {
          "1": {

            type: String,
            required: true
          },
          "2": {
            type: String,
            required: true
          },
          "3": {
            type: String,
            required: true
          },
          "4": {
            type: String,
            required: true
          },
          "5": {
            type: String,
            required: true
          }
        },
        capacity: {
          "128": {
            price: {
              type: Number,
              required: true,
              default: 700
            },
            amount: {
              type: Number,
              default: 20
            }
          },
          "256": {
            price: {
              type: Number,
              required: true,
              default: 750
            },
            amount: {
              type: Number,
              default: 20
            }
          },
          "512": {
            price: {
              type: Number,
              required: true,
              default: 790
            },
            amount: {
              type: Number,
              default: 20
            }
          }
        }
      },
      hexColor: String

    },
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
      builtInMemory: {
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
        text: String
      }],
      required: true
    }
    recommendations: [id, id, id, id]
  }
);

IPhone13ModelSchema.index({ "$**": "text" });

module.exports = IPhone13Model = mongoose.model("products", IPhone13ModelSchema);
