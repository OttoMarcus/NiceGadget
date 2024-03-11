// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WishlistSchema = new Schema({
        // _id:{
        //     type: Schema.Types.ObjectId,
        //     require:  false
        // },
    customerId: {
        type : Number
    },
    products: [Object]
});

module.exports = Wishlist = mongoose.model(
    "wishlist",
    WishlistSchema,
    "wishlist"
);
