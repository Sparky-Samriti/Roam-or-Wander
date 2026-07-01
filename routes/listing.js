const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../modals/listing");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");

const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router.route("/")
.get(wrapAsync(listingController.index))            // All
.post(isLoggedIn, validateListing , upload.single("listing[image]") , wrapAsync(listingController.createListing));  // Create


// Create Form :
router.get("/new", isLoggedIn, listingController.renderNewForm );

router.route("/:id")
.get(wrapAsync(listingController.showListing))         // Show
.put(isLoggedIn, isOwner, upload.single("listing[image]") , validateListing, wrapAsync(listingController.updateListing))     // Edit
.delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing))        // Delete


// Edit Form :
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;