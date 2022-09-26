const Joi = require('joi');

const ValidateSchema = Joi.object({
    username:Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    phone: Joi.number()
        .required(),
    Address: Joi.string().min(3)
        .max(40).required(),
    country:Joi.string()
        .min(3)
        .max(10)
        .required(),
    isAdmin:Joi.boolean()
        .default(false)
})

module.exports = ValidateSchema;