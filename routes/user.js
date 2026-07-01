const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const User = require("../modals/user.js");
const passport = require("passport");
const {redirectUrl, saveRedirectUrl , isLoggedIn , validateUser} = require("../middleware.js");

const userController = require("../controllers/users.js");

router.route("/signup")
.get(userController.renderSignupForm)
.post( validateUser ,wrapAsync(userController.signup));

router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl , passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
}),
    userController.login
);


router.get("/logout" , userController.logout);

router.route("/wishlist")
.get(isLoggedIn , wrapAsync(userController.wishlistShow))
.post(wrapAsync(userController.wishlistPost));

module.exports = router;