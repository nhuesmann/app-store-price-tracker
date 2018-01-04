const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

// Edit this and work on auth, validation, doublecheck setters (run setters option) and virtuals
const UserSchema = new Schema(
  {
    email: {
      type: String,
      index: { unique: true },
      required: true,
      trim: true,
      minlength: 1,
      unique: true,
      lowercase: true,
      validate: {
        isAsync: false,
        validator: validator.isEmail,
        message: '{VALUE} is not a valid email',
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 20,
    },
    // TODO: figure out how to use JWT in browser for stateless auth
    // tokens: [
    //   {
    //     access: {
    //       type: String,
    //       required: true,
    //     },
    //     token: {
    //       type: String,
    //       required: true,
    //     },
    //   },
    // ],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
);

UserSchema.virtual('endpoint').get(function endpoint() {
  return `/users/${this._id}`;
});

UserSchema.virtual('wishlist', {
  ref: 'tracker',
  localField: '_id',
  foreignField: 'creator',
});

UserSchema.plugin(uniqueValidator);

const User = mongoose.model('user', UserSchema);

module.exports = User;
