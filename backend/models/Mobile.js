// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
//
// const ProductSchema = new Schema({
//   id: {
//     type: String,
//     required: true
//   },
//   variant: {
//     type: String,
//     required: true
//   },
//   capacity: {
//     type: String,
//     required: true
//   },
//   color: {
//     type: String,
//     required: true
//   },
//   price: {
//     type: String,
//     required: true
//   },
//   picture: {
//     type: String,
//     required: true
//   },
//   refCategory: {
//     type: String,
//     required: true
//   }
// });
//
// ProductSchema.index({"$**": "text"});
//
// module.exports = Product = mongoose.model("products", ProductSchema);