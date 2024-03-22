const mobileModelsQuantity = require("../models/MobileModelQuantity");
const isValidMongoId = require("../validation/isValidMongoId");

const uniqueRandom = require("unique-random");
const rand = uniqueRandom(0, 999999);

const queryCreator = require("../commonHelpers/queryCreator");
const filterParser = require("../commonHelpers/filterParser");
const _ = require("lodash");
const MobileModel = require("../models/MobileModel");
const MobileProduct = require("../models/MobileProduct");

// exports.addImages = (req, res, next) => {
//   if (req.files.length > 0) {
//     res.json({
//       message: "Photos are received"
//     });
//   } else {
//     res.json({
//       message:
//         "Something wrong with receiving photos at server. Please, check the path folder"
//     });
//   }
// };

exports.addMobileModelQuantity = (req, res, next) => {
  const mobileModelQuantityFields = _.cloneDeep(req.body);

  mobileModelQuantityFields.itemNo = rand();

  // try {
  //   mobileModelQuantityFields.name = mobileModelQuantityFields.name
  //     .toLowerCase()
  //     .trim()
  //     .replace(/\s\s+/g, " ");
  //
  // } catch (err) {
  //   res.status(400).json({
  //     message: `Error happened on server: "${err}" `
  //   });
  // }

  const updatedMobileModelQuantity = queryCreator(mobileModelQuantityFields);

  const newMobileModelQuantity = new MobileModelQuantity(updatedMobileModelQuantity);

  newMobileModelQuantity
    .save()
    .then(mobileModelQuantity => res.json(mobileModelQuantity))
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

const updateMobileModelQuantity = (req, res, next) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  mobileModelsQuantity.findOne({ productId })
    .then(mobileModelQuantity => {
      if (!mobileModelQuantity) {
        return res.status(400).json({
          message: `mobileModelQuantity with id "${productId}" is not found.`
        });
      } else {
        let newQuantity = mobileModelQuantity.quantity + quantity;

        if (newQuantity < 0) {
          return res.status(400).json({
            message: "Insufficient  quantity.",
          });
        }


        if (newQuantity === 0) {
          MobileModel.findOneAndUpdate(
            { id: mobileModelQuantity.refModel },
            { $set: { "colors.$[color].capacities.$[capacity].available": false } },
            {
              arrayFilters: [{ "color.capacities.productId": productId }, { "capacity.productId": productId }],
              new: true,
            },
          ).then(mobModel => {
            console.log('here');
            console.log(mobModel);
          });

          MobileProduct.findOneAndUpdate(
            { id: productId },
            { $set: { available: false } },
            { new: true },
          ).then(product => {
            console.log(product);
          })
        }

        if ((mobileModelQuantity.quantity === 0) && (newQuantity > 0)) {
          // notify product subscribers
          MobileModel.findOneAndUpdate(
            { id: mobileModelQuantity.refModel },
            { $set: { "colors.$[color].capacities.$[capacity].available": true } },
            {
              arrayFilters: [{ "color.capacities.productId": productId }, { "capacity.productId": productId }],
              new: true,
            },
          ).then(mobModel => {
            console.log(mobModel);
          });

          MobileProduct.findOneAndUpdate(
            { id: productId },
            { $set: { available: true } },
            { new: true },
          ).then(product => {
            console.log(product);
          })
        }

        mobileModelsQuantity.findOneAndUpdate(
          { productId: productId },
          { $set: { quantity: newQuantity } },
          { new: true },
        )
          .then(mobileModelQuantity => res.json(mobileModelQuantity))
          .catch(err =>
            res.status(400).json({
              message: `Error happened on server: "${err}" `,
            }),
          );
      }
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

exports.updateMobileModelQuantityAsAdmin = (req, res, next) => {
  updateMobileModelQuantity(req, res, next);
};

exports.updateMobileModelQuantityCheckout = (req, res, next) => {
  updateMobileModelQuantity(req, res, next);
};

exports.getMobileModelsQuantity = async (req, res, next) => {
  const mongooseQuery = filterParser(req.query);
  const perPage = Number(req.query.perPage);
  const startPage = Number(req.query.startPage);
  const sort = req.query.sort;
  const q = typeof req.query.q === "string" ? req.query.q.trim() : null;

  if (q) {
    mongooseQuery.name = {
      $regex: new RegExp(q, "i")
    };
  }

  try {
    const foundMobileModelsQuantity = await mobileModelsQuantity.find(mongooseQuery)
      .skip(startPage * perPage - perPage)
      .limit(perPage)
      .sort(sort);

    const total = await mobileModelsQuantity.countDocuments(mongooseQuery);

    res.json({ data: foundMobileModelsQuantity, total });
  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `
    });
  }
};

exports.getMobileModelsQuantityById = (req, res, next) => {
  const { id } = req.params;
  // if (!isValidMongoId(id)) {
  //   console.log('I am still here?');
  //   return res.status(400).json({
  //     message: `mobileModelQuantity with id "${id}" is not valid`
  //   });
  // }
  // mobileModelsQuantity.findById(id)
  mobileModelsQuantity.findOne({id: id})
    .then(mobileModelQuantity => {
      if (!mobileModelQuantity) {
        res.status(400).json({
        });
      } else {
        res.json(mobileModelQuantity);
      }
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};


