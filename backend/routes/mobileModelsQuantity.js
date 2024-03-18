const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer"); // multer for parsing multipart form data (files)
const fse = require("fs-extra");

//Import controllers
const {
  addMobileModelQuantity,
  updateMobileModelQuantityAsAdmin,
  updateMobileModelQuantityCheckout,
  getMobileModelsQuantity,
  getMobileModelsQuantityById,
} = require("../controllers/mobileModelsQuantity");

// Configurations for multer
const storage = multer.diskStorage({
  // Destination, where files should be stored (image url)
  destination: function(req, file, cb) {
    var newDestination = req.headers.path; // We send image url in header ("path"), when making axios request
    fse.mkdirsSync(newDestination); // We're creating folder in destination, specified in headers "path"
    cb(null, newDestination); // Saving file
  },

  filename: function(req, file, cb) {
    cb(null, file.originalname); // We accept original file-name
  }
});

const fileFilter = (req, file, cb) => {
  // Accept file (only jpeg/jpg/png)
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    // reject file (if not jpeg/jpg/png)
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3 // Max size 5MB
  },
  fileFilter: fileFilter
});
//
// // @route   POST /mobileModelsQuantity/images
// // @desc    Add images
// // @access  Private
// router.post(
//   "/images",
//   passport.authenticate("jwt-admin", { session: false }),
//   upload.array("photos"),
//   addImages
// );

// @route   POST /mobileModelsQuantity
// @desc    Create new mobileModelQuantity
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt-admin", { session: false }),
  addMobileModelQuantity
);

// @route   PUT /mobileModelsQuantity/:id
// @desc    Update existing product
// @access  Private
router.put(
  "/admin/:productId",
  passport.authenticate("jwt-admin", { session: false }),
  updateMobileModelQuantityAsAdmin
);

// @route   PUT /mobileModelsQuantity/:id
// @desc    Update existing product
// @access  user
router.put(
  "/checkout/:productId",
  passport.authenticate("jwt", { session: false }),
  updateMobileModelQuantityCheckout
);

// @route   GET /mobileModelsQuantity
// @desc    GET existing mobileModelsQuantity
// @access  Public
router.get("/", getMobileModelsQuantity);

// @route   GET /mobileModels/:id
// @desc    GET existing mobileModel by id
// @access  Public
router.get("/:id", getMobileModelsQuantityById);

module.exports = router;
