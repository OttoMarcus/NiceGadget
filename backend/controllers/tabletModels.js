const tabletModels = require("../models/TabletModel");
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

exports.addTabletModel = (req, res, next) => {
  const tabletModelFields = _.cloneDeep(req.body);

  tabletModelFields.itemNo = rand();

  // try {
  //   tabletModelFields.name = tabletModelFields.name
  //     .toLowerCase()
  //     .trim()
  //     .replace(/\s\s+/g, " ");
  //
  // } catch (err) {
  //   res.status(400).json({
  //     message: `Error happened on server: "${err}" `
  //   });
  // }

  const updatedTabletModel = queryCreator(tabletModelFields);

  const newTabletModel = new tabletModels(updatedTabletModel);

  newTabletModel
    .save()
    .then(tabletModel => res.json(tabletModel))
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

exports.updateTabletModel = (req, res, next) => {
  const { id } = req.params;
  if (!isValidMongoId(id)) {
    return res.status(400).json({
      message: `tabletModel with id "${id}" is not valid`
    });
  }

  tabletModels.findById(id)
    .then(tabletModel => {
      if (!tabletModel) {
        return res.status(400).json({
          message: `tabletModel with id "${req.params.id}" is not found.`
        });
      } else {
        const tabletModelFields = _.cloneDeep(req.body);

        // try {
        //   tabletModelFields.name = tabletModelFields.name
        //     .toLowerCase()
        //     .trim()
        //     .replace(/\s\s+/g, " ");
        // } catch (err) {
        //   res.status(400).json({
        //     message: `Error happened on server: "${err}" `
        //   });
        // }

        const updatedTabletModel = queryCreator(tabletModelFields);

        tabletModel.findOneAndUpdate(
          { _id: req.params.id },
          { $set: updatedTabletModel },
          { new: true }
        )
          .then(tabletModel => res.json(tabletModel))
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

exports.getTabletModels = async (req, res, next) => {
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
    const foundTabletModels = await tabletModels.find(mongooseQuery)
      .skip(startPage * perPage - perPage)
      .limit(perPage)
      .sort(sort);

    const total = await tabletModels.countDocuments(mongooseQuery);

    res.json({ data: foundTabletModels, total });
  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `
    });
  }
};

exports.getTabletModelById = (req, res, next) => {
  console.log(req.params);
  console.log('I am here');
  const { id } = req.params;
  console.log(id);
  // if (!isValidMongoId(id)) {
  //   console.log('I am still here?');
  //   return res.status(400).json({
  //     message: `tabletModel with id "${id}" is not valid`
  //   });
  // }
  // tabletModels.findById(id)
  tabletModels.findOne({id: id})
    .then(tabletModel => {
      console.log('tabletModel', tabletModel);
      if (!tabletModel) {
        console.log('Surprise, surprise, motherfuckers');
        res.status(400).json({
          message: `tabletModel with itemNo ${req.params.id} is not found`
        });
      } else {
        console.log('else', tabletModel);
        res.json(tabletModel);
      }
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};


