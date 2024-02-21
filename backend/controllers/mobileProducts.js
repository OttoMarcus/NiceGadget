const mobileProducts = require("../models/mobileProduct");
const isValidMongoId = require("../validation/isValidMongoId");

const uniqueRandom = require("unique-random");
const rand = uniqueRandom(0, 999999);

const queryCreator = require("../commonHelpers/queryCreator");
const filterParser = require("../commonHelpers/filterParser");
const _ = require("lodash");

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

exports.addMobileProduct = (req, res, next) => {
  const mobileProductFields = _.cloneDeep(req.body);

  mobileProductFields.itemNo = rand();

  // try {
  //   mobileProductFields.name = mobileProductFields.name
  //     .toLowerCase()
  //     .trim()
  //     .replace(/\s\s+/g, " ");
  //
  // } catch (err) {
  //   res.status(400).json({
  //     message: `Error happened on server: "${err}" `
  //   });
  // }

  const updatedMobileProduct = queryCreator(mobileProductFields);

  const newMobileProduct = new mobileProducts(updatedMobileProduct);

  newMobileProduct
    .save()
    .then(mobileProduct => res.json(mobileProduct))
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

exports.updateMobileProduct = (req, res, next) => {
  const { id } = req.params;
  if (!isValidMongoId(id)) {
    return res.status(400).json({
      message: `mobileProduct with id "${id}" is not valid`
    });
  }

  mobileProducts.findById( id)
    .then(mobileProduct => {
      if (!mobileProduct) {
        return res.status(400).json({
          message: `mobileProduct with id "${req.params.id}" is not found.`
        });
      } else {
        const mobileProductFields = _.cloneDeep(req.body);

        // try {
        //   mobileProductFields.name = mobileProductFields.name
        //     .toLowerCase()
        //     .trim()
        //     .replace(/\s\s+/g, " ");
        // } catch (err) {
        //   res.status(400).json({
        //     message: `Error happened on server: "${err}" `
        //   });
        // }

        const updatedMobileProduct = queryCreator(mobileProductFields);

        mobileProduct.findOneAndUpdate(
          { _id: req.params.id },
          { $set: updatedMobileProduct },
          { new: true }
        )
          .then(mobileProduct => res.json(mobileProduct))
          .catch(err =>
            res.status(400).json({
              message: `Error happened on server: "${err}" `
            })
          );
      }
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

exports.getMobileProducts = async (req, res, next) => {
  const mongooseQuery = filterParser(req.query);
  const perPage = Number(req.query.perPage);
  const startPage = Number(req.query.startPage);
  const sort = req.query.sort;
  const q = typeof req.query.q === 'string' ? req.query.q.trim() : null

  if (q) {
    mongooseQuery.name = {
      $regex: new RegExp(q, "i"),
    };
  }

  try {
    const mobileProducts = await mobileProducts.find(mongooseQuery)
      .skip(startPage * perPage - perPage)
      .limit(perPage)
      .sort(sort)

    const total = await mobileProducts.countDocuments(mongooseQuery);

    res.json({ data: mobileProducts, total });
  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `
    });
  }
};

exports.getMobileProductById = (req, res, next) => {
  const { id } = req.params;
  if (!isValidMongoId(id)) {
    return res.status(400).json({
      message: `mobileProduct with id "${id}" is not valid`
    });
  }
  mobileProducts.findById(id)
    .then(mobileProduct => {
      if (!mobileProduct) {
        res.status(400).json({
          message: `mobileProduct with itemNo ${req.params.itemNo} is not found`
        });
      } else {
        res.json(mobileProduct);
      }
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};


