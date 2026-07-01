const User = require("../modals/user");

module.exports.renderSignupForm = async (req, res) => {
    res.render("users/signup.ejs");
}

module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);

        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
}

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are logged out!");
        res.redirect("/listings");
    });
}

module.exports.wishlistShow = async (req,res) => {
    const currUser = req.user;
    const user = await User.findById(currUser._id).populate({ 
        path: "wishlist"});

    let wishlist = user.wishlist;

    res.render("users/wishlist.ejs" , {wishlist});
}

module.exports.wishlistPost = async (req, res) => {
    const { listingId } = req.body;
    const currUser = req.user;   // logged in user

    if(!currUser) {
        return res.json({success : false , requireLogin : true});
    }

    const user = await User.findById(currUser._id);  // accessing user's wishlist array

     if (!user.wishlist) {
        user.wishlist = [];
    }
    const isAlreadyLiked = user.wishlist.includes(listingId);  // Add a fallback so it doesn't crash if wishlist doesn't exist yet

   

    if (isAlreadyLiked) {
        await User.findByIdAndUpdate(currUser._id, { $pull: { wishlist: listingId } });
        await user.save();
        return res.json({ success: true, action: "removed" });
    } else {
        await User.findByIdAndUpdate(currUser._id, { $push: { wishlist: listingId } });
        await user.save();
        return res.json({ success: true, action: "added" });
    }
}