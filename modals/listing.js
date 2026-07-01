const mongoose = require("mongoose");
const Review = require("./review");
const User = require("./user");

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        url : String ,
        filename : String ,
    },            // set is used when user se image aa rhi hai but link empty hai.
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String
    },
    category: {
        type: String,
        enum : ["Icons", "Design", "Amazing pools", "Beachfront", "Cabins", "Mansions", "Trending", "Lakefront", "Countryside", "National parks", "Caves", "Tropical", "Historical homes", "Camping", "Tiny homes", "Amazing views", "Islands", "Castles", "Farmhouses", "Surfing", "Beach", "Skiing", "Bed & breakfasts", "Golfing", "Creative spaces", "Chef's kitchens", "Luxe", "Vineyard", "New", "Top of the world", "Off-the-grid", "Treehouses", "Play", "Lake", "Hanoks", "Ryokans", "Minsus", "Shepherd's huts", "Earth homes", "Domes", "Yurts", "Trulli", "Cycladic homes", "Campervans", "Windmills", "Barns", "Towers", "Houseboats", "Boats", "Desert", "Arctic", "Ski-in/out", "Grand pianos"],
        default : "Design",
    },
    reviews : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Review"
        }
    ],
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    geometry : {
        type : {
            type : String,
            enum : ["Point"],
            required : true,
        },
        coordinates : {
            type : [Number],
            required : true,
        }
    }
});

listingSchema.post("findOneAndDelete" , async(listing) => {
    if(listing) {
        await Review.deleteMany({_id : {$in : listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;