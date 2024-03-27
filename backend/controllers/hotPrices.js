const isValidMongoId = require("../validation/isValidMongoId");

const uniqueRandom = require("unique-random");
const rand = uniqueRandom(0, 999999);

const queryCreator = require("../commonHelpers/queryCreator");
const filterParser = require("../commonHelpers/filterParser");
const _ = require("lodash");
const MobileModel = require("../models/MobileModel");
const MobileProduct = require("../models/MobileProduct");


exports.getMobileProducts = async (req, res, next) => {

  const mongooseQuery = filterParser(req.query);
  const perPage = Number(req.query.perPage);
  const startPage = Number(req.query.startPage);

  const sort = req.query.sort;/const q = typeof req.query.q === "string" ? req.query.q.trim() : null;

  if (q) {
    mongooseQuery.name = {
      $regex: new RegExp(q, "i"),
    };
  }

  try {
    const foundMobileProducts = await mobileProducts.find(mongooseQuery)
      .sort({ available: -1 })
      .sort(sort)
      .skip(startPage * perPage - perPage)
      .limit(perPage)
    // .sort({ available: -1 })
    // .sort(sort)

    const totalMatching = foundMobileProducts.length;

    const total = await mobileProducts.countDocuments(mongooseQuery);
    // const totalMatching = foundMobileProducts.length;
    const totalPages = Math.ceil(total / perPage);

    res.json({ data: foundMobileProducts, total, totalMatching, totalPages });
  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `,
    });
  }
};

exports.getMobileProductsTotal = async (req, res, next) => {
  const mongooseQuery = filterParser(req.query);
  const q = typeof req.query.q === "string" ? req.query.q.trim() : null;

  if (q) {
    mongooseQuery.name = {
      $regex: new RegExp(q, "i"),
    };
  }

  try {
    const total = await mobileProducts.countDocuments(mongooseQuery);

    res.json({ data: foundMobileProducts, total });
  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `,
    });
  }
};

exports.getMobileProductsTotal = async (req, res, next) => {
  const mongooseQuery = filterParser(req.query);
  const q = typeof req.query.q === "string" ? req.query.q.trim() : null;

  if (q) {
    mongooseQuery.name = {
      $regex: new RegExp(q, "i"),
    };
  }

  try {
    const total = await mobileProducts.countDocuments(mongooseQuery);

    res.json({ total });
  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `,
    });
  }
};


