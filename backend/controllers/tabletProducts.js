const tabletProducts = require("../models/TabletProduct");
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

exports.addTabletProduct = (req, res, next) => {
  const tabletProductFields = _.cloneDeep(req.body);

  tabletProductFields.itemNo = rand();

  // try {
  //   tabletProductFields.name = tabletProductFields.name
  //     .toLowerCase()
  //     .trim()
  //     .replace(/\s\s+/g, " ");
  //
  // } catch (err) {
  //   res.status(400).json({
  //     message: `Error happened on server: "${err}" `
  //   });
  // }

  const updatedTabletProduct = queryCreator(tabletProductFields);

  const newTabletProduct = new tabletProducts(updatedTabletProduct);

  newTabletProduct
    .save()
    .then(tabletProduct => res.json(tabletProduct))
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

exports.updateTabletProduct = (req, res, next) => {
  const { id } = req.params;
  if (!isValidMongoId(id)) {
    return res.status(400).json({
      message: `tabletProduct with id "${id}" is not valid`
    });
  }

  tabletProducts.findById( id)
    .then(tabletProduct => {
      if (!tabletProduct) {
        return res.status(400).json({
          message: `tabletProduct with id "${req.params.id}" is not found.`
        });
      } else {
        const tabletProductFields = _.cloneDeep(req.body);

        // try {
        //   tabletProductFields.name = tabletProductFields.name
        //     .toLowerCase()
        //     .trim()
        //     .replace(/\s\s+/g, " ");
        // } catch (err) {
        //   res.status(400).json({
        //     message: `Error happened on server: "${err}" `
        //   });
        // }

        const updatedTabletProduct = queryCreator(tabletProductFields);

        tabletProduct.findOneAndUpdate(
          { _id: req.params.id },
          { $set: updatedTabletProduct },
          { new: true }
        )
          .then(tabletProduct => res.json(tabletProduct))
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

exports.getTabletProducts = async (req, res, next) => {
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
    const foundTabletProducts = await tabletProducts.find(mongooseQuery)
      .skip(startPage * perPage - perPage)
      .limit(perPage)
      .sort(sort)

    const total = await tabletProducts.countDocuments(mongooseQuery);

    res.json({ data: foundTabletProducts, total });
  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `
    });
  }
};

exports.getTabletProductById = (req, res, next) => {
  const { id } = req.params;
  if (!isValidMongoId(id)) {
    return res.status(400).json({
      message: `tabletProduct with id "${id}" is not valid`
    });
  }
  tabletProducts.findById(id)
    .then(tabletProduct => {
      if (!tabletProduct) {
        res.status(400).json({
          message: `tabletProduct with itemNo ${req.params.itemNo} is not found`
        });
      } else {
        res.json(tabletProduct);
      }
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};


