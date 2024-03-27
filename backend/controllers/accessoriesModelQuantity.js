const accessoriesModelsQuantity = require("../models/AccessoriesModelQuantity");
const AccessoriesModel = require("../models/AccessoriesModels");
const AccessoriesProduct = require("../models/AccessoriesProducts");
const uniqueRandom = require("unique-random");
const rand = uniqueRandom(0, 999999);

const queryCreator = require("../commonHelpers/queryCreator");
const filterParser = require("../commonHelpers/filterParser");
const _ = require("lodash");
const { login } = require("passport/lib/http/request");

exports.addAccessoriesModelQuantity = (req, res, next) => {
  const accessoriesModelQuantityFields = _.cloneDeep(req.body);

  accessoriesModelQuantityFields.itemNo = rand();

  // try {
  //   accessoriesModelQuantityFields.name = accessoriesModelQuantityFields.name
  //     .toLowerCase()
  //     .trim()
  //     .replace(/\s\s+/g, " ");
  //
  // } catch (err) {
  //   res.status(400).json({
  //     message: `Error happened on server: "${err}" `
  //   });
  // }

  const updatedAccessoriesModelQuantity = queryCreator(accessoriesModelQuantityFields);

  const newAccessoriesModelQuantity = new accessoriesModelsQuantity(updatedAccessoriesModelQuantity);

  newAccessoriesModelQuantity
    .save()
    .then(accessoriesModelQuantity => res.json(accessoriesModelQuantity))
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      }),
    );
};

const updateAccessoriesModelQuantity = async (req, res, next) => {
  const { productName } = req.params;
  const { quantity } = req.body;

  accessoriesModelsQuantity.findOne({ productName })
    .then(accessoriesModelQuantity => {
      if (!accessoriesModelQuantity) {
        return res.status(400).json({
          message: `accessoriesModelQuantity with productName "${productName}" is not found.`,
        });
      } else {
        let newQuantity = accessoriesModelQuantity.quantity + quantity;

        if (newQuantity < 0) {
          return res.status(400).json({
            message: "Insufficient  quantity.",
          });
        }

        if (newQuantity === 0) {
          AccessoriesModel.findOneAndUpdate(
            { name: productName },
            { $set: { available: false } },
            { new: true },
          ).then(accModel => {
            console.log(accModel);
          });

          AccessoriesProduct.findOneAndUpdate(
            { name: productName },
            { $set: { available: false } },
            { new: true },
          ).then(product => {
            console.log(product);
          })
        }

        if ((accessoriesModelQuantity.quantity === 0) && (newQuantity > 0)) {
          // notify product subscribers
          AccessoriesModel.findOneAndUpdate(
            { name: productName },
            { $set: { available: true } },
            { new: true },
          ).then(accModel => {
            console.log(accModel);
          });

          AccessoriesProduct.findOneAndUpdate(
            { name: productName },
            { $set: { available: true } },
            { new: true },
          ).then(product => {
            console.log(product);
          })
        }


        accessoriesModelsQuantity.findOneAndUpdate(
          { productName: productName },
          { $set: { quantity: newQuantity } },
          { new: true },
        )
          .then(accessoriesModelQuantity => res.json(accessoriesModelQuantity))
          .catch(err =>
            res.status(400).json({
              message: `Error happened on server: "${err}" `,
            }),
          );
      }
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      }),
    );
};

exports.updateAccessoriesModelQuantityAsAdmin = (req, res, next) => {
  updateAccessoriesModelQuantity(req, res, next);
};

exports.updateAccessoriesModelQuantityCheckout = (req, res, next) => {
  updateAccessoriesModelQuantity(req, res, next);
};

exports.getAccessoriesModelsQuantity = async (req, res, next) => {
  const mongooseQuery = filterParser(req.query);
  const perPage = Number(req.query.perPage);
  const startPage = Number(req.query.startPage);
  const sort = req.query.sort;
  const q = typeof req.query.q === "string" ? req.query.q.trim() : null;

  if (q) {
    mongooseQuery.name = {
      $regex: new RegExp(q, "i"),
    };
  }

  try {
    const foundAccessoriesModelsQuantity = await accessoriesModelsQuantity.find(mongooseQuery)
      .skip(startPage * perPage - perPage)
      .limit(perPage)
      .sort(sort);

    const total = await accessoriesModelsQuantity.countDocuments(mongooseQuery);

    res.json({ data: foundAccessoriesModelsQuantity, total });
  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `,
    });
  }
};

exports.getAccessoriesModelsQuantityById = (req, res, next) => {
  const { productName } = req.params;

  accessoriesModelsQuantity.findOne({ productName: productName })
    .then(accessoriesModelQuantity => {
      if (!accessoriesModelQuantity) {
        res.status(400).json({
          message: `accessoriesModelQuantity with productName: ${productName} is not found`,
        });
      } else {
        res.json(accessoriesModelQuantity);
      }
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      }),
    );
};


