const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accessoriesModelSchema = new Schema({
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
                default: "white",
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
            ]
        }
    ],
    techSpecs: {
        weight: {
            type: String,
            required: true
        },
        size: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        power: {
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
    }
});

accessoriesModelSchema.index({ "$**": "text" });

module.exports = AccessoriesModel = mongoose.model("accessories-model", accessoriesModelSchema);

