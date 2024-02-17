const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  // {
  //   itemNo: {
  //     type: String,
  //     required: true
  //   },
  //   enabled: {
  //     type: Boolean,
  //     required: true,
  //     default: true
  //   },
  //   name: {
  //     type: String,
  //     required: true
  //   },
  //   currentPrice: {
  //     type: Number,
  //     required: true
  //   },
  //   previousPrice: {
  //     type: Number
  //   },
  //   categories: {
  //     type: String,
  //     required: true
  //   },
  //   imageUrls: [
  //     {
  //       type: String,
  //       required: true
  //     }
  //   ],
  //   quantity: {
  //     type: Number,
  //     required: true,
  //     default: 0
  //   },
  //   color: {
  //     type: String
  //   },
  //   sizes: {
  //     type: String
  //   },
  //   productUrl: {
  //     type: String
  //   },
  //   brand: {
  //     type: String
  //   },
  //   manufacturer: {
  //     type: String
  //   },
  //   manufacturerCountry: {
  //     type: String
  //   },
  //   seller: {
  //     type: String
  //   },
  //   date: {
  //     type: Date,
  //     default: Date.now
  //   }
  // },
  // { strict: false }
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
            required: true,
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
          },
        },
        capacity: {
          '128': {
            price: {
              type: Number,
              required: true,
              default: 700
            },
            amount: {
              type: Number,
              default: 20,
            }
          },
          '256': {
            price: {
              type: Number,
              required: true,
              default: 750
            },
            amount: {
              type: Number,
              default: 20,
            }
          },
          '512': {
            price: {
              type: Number,
              required: true,
              default: 790
            },
            amount: {
              type: Number,
              default: 20,
            }
          },
        },
        hexColor: {
          type: String,
          required: true,
        },
      },
      midnight: {
        pictures: {
          "1": {
            type: String,
            required: true,
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
          },
        },
        capacity: {
          '128': {
            price: {
              type: Number,
              required: true,
              default: 700
            },
            amount: {
              type: Number,
              default: 20,
            }
          },
          '256': {
            price: {
              type: Number,
              required: true,
              default: 750
            },
            amount: {
              type: Number,
              default: 20,
            }
          },
          '512': {
            price: {
              type: Number,
              required: true,
              default: 790
            },
            amount: {
              type: Number,
              default: 20,
            }
          },
        },
        hexColor: String
      },
      red: {
        pictures: {
          "1": {
            type: String,
            required: true,
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
          },
        },
        capacity: {
          '128': {
            price: {
              type: Number,
              required: true,
              default: 700
            },
            amount: {
              type: Number,
              default: 20,
            }
          },
          '256': {
            price: {
              type: Number,
              required: true,
              default: 750
            },
            amount: {
              type: Number,
              default: 20,
            }
          },
          '512': {
            price: {
              type: Number,
              required: true,
              default: 790
            },
            amount: {
              type: Number,
              default: 20,
            }
          },
        },
        hexColor: String
      },
      starlight: {
        pictures: {
          "1": {
            type: String,
            required: true,
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
          },
        },
        capacity: {
          '128': {
            price: {
              type: Number,
              required: true,
              default: 700
            },
            amount: {
              type: Number,
              default: 20,
            }
          },
          '256': {
            price: {
              type: Number,
              required: true,
              default: 750
            },
            amount: {
              type: Number,
              default: 20,
            }
          },
          '512': {
            price: {
              type: Number,
              required: true,
              default: 790
            },
            amount: {
              type: Number,
              default: 20,
            }
          },
        }
      },
      hexColor: String

    },
    techSpecs: {
      screen: {
        type: String,
        required: true,
      },
      resolution: {
        type: String,
        required: true,
      },
      processor: {
        type: String,
        required: true,
      },
      ram: {
        type: String,
        required: true,
      },
      builtInMemory: {
        type: String,
        required: true,
      },
      camera: {
        type: String,
        required: true,
      },
      zoom: {
        type: String,
        required: true,
      },
      cell: {
        type: String,
        required: true,
      },

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

  }
);

ProductSchema.index({"$**": "text"});

module.exports = Product = mongoose.model("products", ProductSchema);
