const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title : Joi.string().required(),
        description : Joi.string().required(),
        location : Joi.string().required(),
        category : Joi.string().required(),
        price : Joi.number().required().min(0),
        image : Joi.string().allow("" , null),
    }).required(),
});

module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        reviewSender : Joi.string().required(),
        comment : Joi.string().required(),
        rating : Joi.number().min(1).max(5),
    }).required(),
});

module.exports.userSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    wishlist: Joi.array().items(Joi.string()).default([]) 
});