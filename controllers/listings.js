const Listing = require("../modals/listing");
const maptilerClient = require('@maptiler/client');
maptilerClient.config.apiKey = process.env.MAP_TOKEN;

module.exports.index = async (req, res) => {
    let allList = await Listing.find({});
    res.render("./listings/index.ejs", { allList })
}

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
}

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const currList = await Listing.findById(id)
    .populate({ 
        path: "reviews",
        populate: { 
            path: "author" 
        } 
    }).populate("owner");
    if (!currList) {
        console.log(id);
        req.flash("error", "Listing does not exist!");
        return res.redirect("/listings");
    }
    // console.log(currList);
    res.render("./listings/show.ejs", { currList });
}

module.exports.createListing = async (req, res, next) => {
    // let {title , description , image , price , location } = req.body;
    // let newList = new Listing({
    //     title : title,
    //     description : description,
    //     image : image,
    //     price : price,
    //     location : location,
    // });
    // or below single line with writing the names of input elements in create form as listing[name] etc.

    const maptilerResponse = await maptilerClient.geocoding.forward(req.body.listing.location, { limit: 1 });

    let url = req.file.path;
    let filename = req.file.filename;

    let newList = new Listing(req.body.listing);
    newList.owner = req.user._id;

    newList.image = {url , filename};

    const [longitude, latitude] = maptilerResponse.features[0].center;
    newList.geometry = {
        type: "Point",
        coordinates: [longitude, latitude]
    };

    await newList.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
}

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    let currList = await Listing.findById(id);
    if (!currList) {
        req.flash("error", "Listing does not exist!");
        return res.redirect("/listings");
    }

    let originalImageUrl = currList.image.url;
    originalImageUrl = originalImageUrl.replace("/upload" , "/upload/w_250");

    res.render("listings/edit.ejs", { currList , originalImageUrl });
}

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let newList = req.body.listing;
    console.log(newList);
    let listing = await Listing.findByIdAndUpdate(id, { ...newList });

    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url , filename};
        await listing.save();
    }

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedList = await Listing.findByIdAndDelete(id);
    console.log(deletedList);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}