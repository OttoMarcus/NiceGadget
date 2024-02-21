const mobileModelsAmount = require("../models/MobileModelAmount");
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

exports.addMobileModelAmount = (req, res, next) => {
  const mobileModelAmountFields = _.cloneDeep(req.body);

  mobileModelAmountFields.itemNo = rand();

  // try {
  //   mobileModelAmountFields.name = mobileModelAmountFields.name
  //     .toLowerCase()
  //     .trim()
  //     .replace(/\s\s+/g, " ");
  //
  // } catch (err) {
  //   res.status(400).json({
  //     message: `Error happened on server: "${err}" `
  //   });
  // }

  const updatedMobileModelAmount = queryCreator(mobileModelAmountFields);

  const newMobileModelAmount = new mobileModelsAmount(updatedMobileModelAmount);

  newMobileModelAmount
    .save()
    .then(mobileModelAmount => res.json(mobileModelAmount))
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

exports.updateMobileModelAmount = (req, res, next) => {
  const { id } = req.params;
  if (!isValidMongoId(id)) {
    return res.status(400).json({
      message: `mobileModelAmount with id "${id}" is not valid`
    });
  }

  mobileModelsAmount.findById( id)
    .then(mobileModelAmount => {
      if (!mobileModelAmount) {
        return res.status(400).json({
          message: `mobileModelAmount with id "${req.params.id}" is not found.`
        });
      } else {
        const mobileModelAmountFields = _.cloneDeep(req.body);

        // try {
        //   mobileModelAmountFields.name = mobileModelAmountFields.name
        //     .toLowerCase()
        //     .trim()
        //     .replace(/\s\s+/g, " ");
        // } catch (err) {
        //   res.status(400).json({
        //     message: `Error happened on server: "${err}" `
        //   });
        // }

        const updatedMobileModelAmount = queryCreator(mobileModelAmountFields);

        mobileModelAmount.findOneAndUpdate(
          { _id: req.params.id },
          { $set: updatedMobileModelAmount },
          { new: true }
        )
          .then(mobileModelAmount => res.json(mobileModelAmount))
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

exports.getMobileModelAmounts = async (req, res, next) => {
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
    const mobileModelAmounts = await mobileModelsAmount.find(mongooseQuery)
      .skip(startPage * perPage - perPage)
      .limit(perPage)
      .sort(sort)

    const total = await mobileModelsAmount.countDocuments(mongooseQuery);

    res.json({ data: mobileModelAmounts, total });
  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `
    });
  }
};

exports.getMobileModelAmountById = (req, res, next) => {
  const { id } = req.params;
  if (!isValidMongoId(id)) {
    return res.status(400).json({
      message: `mobileModelAmount with id "${id}" is not valid`
    });
  }
  mobileModelsAmount.findById(id)
    .then(mobileModelAmount => {
      if (!mobileModelAmount) {
        res.status(400).json({
          message: `mobileModelAmount with itemNo ${req.params.itemNo} is not found`
        });
      } else {
        res.json(mobileModelAmount);
      }
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};


