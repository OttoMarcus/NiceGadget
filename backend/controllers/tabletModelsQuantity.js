const tabletModelsQuantity = require("../models/TabletModelQuantity");
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

exports.addTabletModelQuantity = (req, res, next) => {
  const tabletModelQuantityFields = _.cloneDeep(req.body);

  tabletModelQuantityFields.itemNo = rand();

  // try {
  //   tabletModelQuantityFields.name = tabletModelQuantityFields.name
  //     .toLowerCase()
  //     .trim()
  //     .replace(/\s\s+/g, " ");
  //
  // } catch (err) {
  //   res.status(400).json({
  //     message: `Error happened on server: "${err}" `
  //   });
  // }

  const updatedTabletModelQuantity = queryCreator(tabletModelQuantityFields);

  const newTabletModelQuantity = new tabletModelsQuantity(updatedTabletModelQuantity);

  newTabletModelQuantity
    .save()
    .then(tabletModelQuantity => res.json(tabletModelQuantity))
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

exports.updateTabletModelQuantity = (req, res, next) => {
  const { id } = req.params;
  if (!isValidMongoId(id)) {
    return res.status(400).json({
      message: `tabletModelQuantity with id "${id}" is not valid`
    });
  }

  tabletModelsQuantity.findById(id)
    .then(tabletModelQuantity => {
      if (!tabletModelQuantity) {
        return res.status(400).json({
          message: `tabletModelQuantity with id "${req.params.id}" is not found.`
        });
      } else {
        const tabletModelQuantityFields = _.cloneDeep(req.body);

        // try {
        //   tabletModelQuantityFields.name = tabletModelQuantityFields.name
        //     .toLowerCase()
        //     .trim()
        //     .replace(/\s\s+/g, " ");
        // } catch (err) {
        //   res.status(400).json({
        //     message: `Error happened on server: "${err}" `
        //   });
        // }

        const updatedTabletModelQuantity = queryCreator(tabletModelQuantityFields);

        tabletModelQuantity.findOneAndUpdate(
          { _id: req.params.id },
          { $set: updatedtabletModelQuantity },
          { new: true }
        )
          .then(tabletModelQuantity => res.json(tabletModelQuantity))
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

exports.getTabletModelsQuantity = async (req, res, next) => {
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
    const foundTabletModelsQuantity = await tabletModelsQuantity.find(mongooseQuery)
      .skip(startPage * perPage - perPage)
      .limit(perPage)
      .sort(sort);

    const total = await tabletModelsQuantity.countDocuments(mongooseQuery);

    res.json({ data: foundTabletModelsQuantity, total });
  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `
    });
  }
};

exports.getTabletModelsQuantityById = (req, res, next) => {
  console.log(req.params);
  console.log('I am here');
  const { id } = req.params;
  console.log(id);
  // if (!isValidMongoId(id)) {
  //   console.log('I am still here?');
  //   return res.status(400).json({
  //     message: `tabletModelQuantity with id "${id}" is not valid`
  //   });
  // }
  // tabletModelsQuantity.findById(id)
  tabletModelsQuantity.findOne({id: id})
    .then(tabletModelQuantity => {
      console.log('tabletModelQuantity', tabletModelQuantity);
      if (!tabletModelQuantity) {
        console.log('Surprise, surprise, motherfuckers');
        res.status(400).json({
          message: `tabletModelQuantity with itemNo ${req.params.id} is not found`
        });
      } else {
        console.log('else', tabletModelQuantity);
        res.json(tabletModelQuantity);
      }
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};


