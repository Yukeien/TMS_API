const Joi = require("@hapi/joi");
const customJoi = Joi.extend(require("joi-phone-number"));

const schemas = {
  user: Joi.object().keys({
    firstName: Joi.string().min(2).max(25).required().messages({
      "string.min": `First name should have at least {#limit} characters.`,
      "string.max": `First name should have at most {#limit} characters.`,
      "string.empty": "First name can not be empty.",
      "any.required": "First name is a required field.",
    }),
    lastName: Joi.string().min(2).max(25).required().messages({
      "string.min": `Last name should have at least {#limit} characters.`,
      "string.max": `Last name should have at most {#limit} characters.`,
      "string.empty": "Last name can not be empty.",
      "any.required": "Last name is a required field.",
    }),
    email: Joi.string()
      .min(5)
      .required()
      .email({
        minDomainSegments: 2,
        tlds: {
          allow: ["com", "net", "fr", "io"],
        },
      })
      .messages({
        "string.email": "Invalid Email Syntax.",
        "string.min": `Email should have at least {#limit} characters.`,
        "string.empty": "Email can not be empty.",
        "any.required": "Email is a required field.",
      }),
    password: Joi.string()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
      .required()
      .messages({
        "string.pattern.base":
          "Password must have at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character.",
        "string.empty": "Password can not be empty.",
        "any.required": "Password is a required field.",
      }),
    repeat_password: Joi.string()
      .required()
      .valid(Joi.ref("password"))
      .messages({
        "any.only": "Passwords mismatch.",
        "any.required": "Repeat password is a required field.",
      }),
    address: Joi.object().keys({
      street: Joi.string().min(6).max(30).required().messages({
        "string.max": `Street should have at most {#limit} characters.`,
        "string.min": `Street should have at least {#limit} characters.`,
        "string.empty": "Street can not be empty.",
        "any.required": "Street is a required field.",
      }),
      city: Joi.string().min(2).max(30).required().messages({
        "string.max": `City should have at most {#limit} characters.`,
        "string.min": `City should have at least {#limit} characters.`,
        "string.empty": "City can not be empty.",
        "any.required": "City is a required field.",
      }),
      zipcode: Joi.string().min(2).max(10).required().messages({
        "string.max": `Zipcode should have at most {#limit} characters.`,
        "string.min": `Zipcode should have at least {#limit} characters.`,
        "string.empty": "Zipcode can not be empty.",
        "any.required": "Zipcode is a required field.",
      }),
      country: Joi.string().min(2).max(20).required().messages({
        "string.max": `Country should have at most {#limit} characters.`,
        "string.min": `Country should have at least {#limit} characters.`,
        "string.empty": "Country can not be empty.",
        "any.required": "Country is a required field.",
      }),
    }),
    phoneNumber: customJoi.string().phoneNumber().required().messages({
      "phoneNumber.invalid": "Invalid phone number.",
      "string.empty": "Phone number can not be empty.",
      "any.required": "Phone number is a required field.",
    }),
    birthdate: Joi.date().required().messages({
      "date.base": "Invalid date format.",
      "string.empty": "Birthdate can not be empty.",
      "any.required": "Birthdate is a required field.",
    }),
  }),
};

module.exports = schemas;
