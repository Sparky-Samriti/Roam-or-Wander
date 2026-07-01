const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync");
const Review = require("../modals/review");
const Listing = require("../modals/listing");
const {validateReview , isLoggedIn , isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

// Review saving :
router.post("/", isLoggedIn , validateReview , wrapAsync(reviewController.createReview));

// Review delete :
router.delete("/:reviewId" , isLoggedIn , isReviewAuthor , wrapAsync(reviewController.destroyReview));

module.exports = router;