const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    minLength: 2,
    maxLength: 25,
    required: true,
  },
  lastName: {
    type: String,
    minLength: 2,
    maxLength: 25,
    required: true,
  },
  email: {
    type: String,
    minLength: 5,
    unique: true,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  address: {
    street: {
      type: String,
      minLength: 6,
      maxLength: 30,
      required: true,
    },
    city: {
      type: String,
      minLength: 2,
      maxLength: 30,
      required: true,
    },
    zipcode: {
      type: String,
      minLength: 2,
      maxLength: 10,
      required: true,
    },
    country: {
      type: String,
      minLength: 2,
      maxLength: 20,
      required: true,
    },
  },
  phoneNumber: {
    type: String,
    minLength: 10,
    maxLength: 14,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.encryptPassword = function (password) {
  return crypto.createHmac("sha1", this.salt).update(password).digest("hex");
  //more secure – return crypto.pbkdf2Sync(password, this.salt, 10000, 512);
};

userSchema.virtual("userId").get(function () {
  return this.id;
});

userSchema
  .virtual("password")
  .set(function (password) {
    this._plainPassword = password;
    this.salt = crypto.randomBytes(32).toString("hex");
    //more secure - this.salt = crypto.randomBytes(128).toString('hex');
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function () {
    return this._plainPassword;
  });

userSchema.methods.checkPassword = function (password) {
  return this.encryptPassword(password) === this.hashedPassword;
};

module.exports = mongoose.model("User", userSchema);
