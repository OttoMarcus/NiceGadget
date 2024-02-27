const mobileModelsQuantity = require("../models/mobileModelQuantity");
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

exports.updateMobileModelQuantity = (req, res, next) => {
  const { id } = req.params;
  if (!isValidMongoId(id)) {
    return res.status(400).json({
      message: `mobileModelQuantity with id "${id}" is not valid`
    });
  }

  mobileModelsQuantity.findById(id)
    .then(mobileModelQuantity => {
      if (!mobileModelQuantity) {
        return res.status(400).json({
          message: `mobileModelQuantity with id "${req.params.id}" is not found.`
        });
      } else {
        const mobileModelQuantityFields = _.cloneDeep(req.body);

        // try {
        //   mobileModelQuantityFields.name = mobileModelQuantityFields.name
        //     .toLowerCase()
        //     .trim()
        //     .replace(/\s\s+/g, " ");
        // } catch (err) {
        //   res.status(400).json({
        //     message: `Error happened on server: "${err}" `
        //   });
        // }

        const updatedMobileModelQuantity = queryCreator(mobileModelQuantityFields);

        mobileModelQuantity.findOneAndUpdate(
          { _id: req.params.id },
          { $set: updatedmobileModelQuantity },
          { new: true }
        )
          .then(mobileModelQuantity => res.json(mobileModelQuantity))
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
  console.log(req.params);
  console.log('I am here');
  const { id } = req.params;
  console.log(id);
  // if (!isValidMongoId(id)) {
  //   console.log('I am still here?');
  //   return res.status(400).json({
  //     message: `mobileModelQuantity with id "${id}" is not valid`
  //   });
  // }
  // mobileModelsQuantity.findById(id)
  mobileModelsQuantity.findOne({id: id})
    .then(mobileModelQuantity => {
      console.log('mobileModelQuantity', mobileModelQuantity);
      if (!mobileModelQuantity) {
        console.log('Surprise, surprise, motherfuckers');
        res.status(400).json({
          message: `mobileModelQuantity with itemNo ${req.params.id} is not found`
        });
      } else {
        console.log('else', mobileModelQuantity);
        res.json(mobileModelQuantity);
      }
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};


