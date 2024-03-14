const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');
const queryCreator = require('../commonHelpers/queryCreator');
const _ = require('lodash');
const Cart = require("../models/Cart");


exports.createWishlist = (req, res, next) => {
    Wishlist.findOne({ id: req.body.id })
        .then((wishlist ) => {
            console.log( `suda`,req.body.id  )
            console.log(`wishlist`, wishlist);
            if (wishlist) {
                return res
                    .status(400)
                    .json({ message: `Wishlist for this customer already exists` });
            } else if (!wishlist) {
                console.log(`req.body`, req.body);
                const wishlistData = _.cloneDeep(req.body);
                console.log(`qwerty1` ,req.body.id)
                 wishlistData.id = req.body.id;
                wishlistData.products = req.body.products;
                console.log(`qwerty` ,wishlistData )
                const newWishlist = new Wishlist(queryCreator(wishlistData));

                newWishlist
                    .save()
                    .then((wishlist) => {
                        return Wishlist.populate(wishlist, { path: 'products customerId' });
                    })
                    .then((populatedWishlist) => {
                        res.json(populatedWishlist);
                    })
                    .catch((err) => {
                        res.status(400).json({
                            message: `Error happened on server: "${err}" `,
                        });
                    });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: `Error happened on server: "${err}" `,
            });
        });
};

exports.updateWishlist = async (req, res, next) => {
    try {
        const wishlist = await Wishlist.findOne({ id: req.body.id });

        if (!wishlist) {
            const newFavor = {
                id: req.body.id,
                products: req.body.products || []
            };
            const favor = new Wishlist(newFavor);
            const savedCart = await favor.save();

            return res.json(savedCart);
        } else {
            wishlist.products = req.body.products || wishlist.products;
            const updatedCart = await wishlist.save();
            return res.json(updatedCart);
        }
    } catch (err) {
        return res.status(400).json({
            message: `Error happened on server: "${err}" `,
        });
    }
};
// exports.updateWishlist =(req, res, next) => {
//   Wishlist.findOne({ id: req.body.id })
//     .then((wishlist) => {
//         if (!wishlist) {
//             const newFavor = {
//                 id: req.body.id,
//                 products: req.body.products || []
//             };
//             const favor = new Wishlist(newFavor);
//             const savedCart = favor.save();
//
//             return res.json(savedCart);
//         } else {
//             wishlist.products = req.body.products || wishlist.products;
//             const updatedCart = wishlist.save();
//             return res.json(updatedCart);
//         }
//       // if (!wishlist) {
//       //   const wishlistData = _.cloneDeep(req.body);
//       //   wishlistData.id = req.body.id;
//       //
//       //   const newWishlist = new Wishlist(queryCreator(wishlistData));
//       //
//       //   newWishlist.populate('products').populate('customerId').execPopulate();
//       //
//       //   newWishlist
//       //     .save()
//       //     .then((wishlist) => res.json(wishlist))
//       //     .catch((err) =>
//       //       res.status(400).json({
//       //         message: `Error happened on server: "${err}" `,
//       //       })
//       //     );
//       // }
//       // else {
//       //   const wishlistData =  new Wishlist(req.body);
//       //   // const updatedWishlist = queryCreator(wishlistData);
//       //
//       //   Wishlist.findOneAndUpdate(
//       //     { id: req.body.id },
//       //     { $set: updatedWishlist },
//       //     { new: true }
//       //   )
//       //     .populate('products')
//       //     .populate('id')
//       //     .then((wishlist) => res.json(wishlist))
//       //     .catch((err) =>
//       //       res.status(400).json({
//       //         message: `Error happened on server: "${err}" `,
//       //       })
//       //     );
//       // }
//     })
//     .catch((err) =>
//       res.status(400).json({
//         message: `Error happened on server: "${err}" `,
//       })
//     );
// };

exports.addProductToWishlist = async (req, res, next) => {
  let productToAdd;

  try {
    productToAdd = await Product.findOne({ _id: req.params.productId });
  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `,
    });
  }

  if (!productToAdd) {
    res.status(400).json({
      message: `Product with _id (ObjectId) "${req.params.productId}" does not exist`,
    });
  } else {
    Wishlist.findOne({ customerId: req.user.id })
      .then((wishlist) => {
        if (!wishlist) {
          const wishlistData = {};
          wishlistData.customerId = req.user.id;
          wishlistData.products = [].concat(req.params.productId);
          const newWishlist = new Wishlist(queryCreator(wishlistData));

          newWishlist
            .populate('products')
            .populate('customerId')
            .execPopulate();

          newWishlist
            .save()
            .then((wishlist) => res.json(wishlist))
            .catch((err) =>
              res.status(400).json({
                message: `Error happened on server: "${err}" `,
              })
            );
        } else {
          const wishlistData = {};
          wishlistData.products = wishlist.products.concat(
            req.params.productId
          );
          const updatedWishlist = queryCreator(wishlistData);

          Wishlist.findOneAndUpdate(
            { customerId: req.user.id },
            { $set: updatedWishlist },
            { new: true }
          )
            .populate('products')
            .populate('customerId')
            .then((wishlist) => res.json(wishlist))
            .catch((err) =>
              res.status(400).json({
                message: `Error happened on server: "${err}" `,
              })
            );
        }
      })
      .catch((err) =>
        res.status(400).json({
          message: `Error happened on server: "${err}" `,
        })
      );
  }
};

exports.deleteProductFromWishlish = async (req, res, next) => {
  Wishlist.findOne({ customerId: req.user.id })
    .then((wishlist) => {
      if (!wishlist) {
        res.status(400).json({ message: `Wishlist does not exist` });
      } else {
        if (!wishlist.products.includes(req.params.productId)) {
          res.status(400).json({
            message: `Product with _id "${req.params.productId}" is absent in wishlist.`,
          });

          return;
        }

        const wishlistData = {};
        wishlistData.products = wishlist.products.filter(
          (elem) => elem.toString() !== req.params.productId
        );

        const updatedWishlist = queryCreator(wishlistData);

        if (wishlistData.products.length === 0) {
          return Wishlist.deleteOne({ customerId: req.user.id })
            .then((deletedCount) =>
              res.status(200).json({
                products: [],
              })
            )
            .catch((err) =>
              res.status(400).json({
                message: `Error happened on server: "${err}" `,
              })
            );
        }

        Wishlist.findOneAndUpdate(
          { customerId: req.user.id },
          { $set: updatedWishlist },
          { new: true }
        )
          .populate('products')
          .populate('customerId')
          .then((wishlist) => res.json(wishlist))
          .catch((err) =>
            res.status(400).json({
              message: `Error happened on server: "${err}" `,
            })
          );
      }
    })
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};

exports.deleteWishlist = (req, res, next) => {
  Wishlist.findOne({ customerId: req.user.id }).then(async (wishlist) => {
    if (!wishlist) {
      return res
        .status(400)
        .json({ message: `Wishlist for this customer is not found.` });
    } else {
      const wishlistToDelete = await Wishlist.findOne({
        customerId: req.user.id,
      });

      Wishlist.deleteOne({ customerId: req.user.id })
        .then((deletedCount) =>
          res.status(200).json({
            message: `Wishlist witn id "${wishlistToDelete._id}" is successfully deletes from DB `,
          })
        )
        .catch((err) =>
          res.status(400).json({
            message: `Error happened on server: "${err}" `,
          })
        );
    }
  });
};

exports.getWishlist = (req, res, next) => {
    console.log(`response`, req.headers.id);
    Wishlist.findOne({id: req.headers.id})

        .then((wishlist) =>  res.json(wishlist))
        .catch((err) => res.status(400).json({
            message: `Error happened on server: "${err}" `,
        }));
};

