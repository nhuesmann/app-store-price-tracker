const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

// Edit this and work on auth, validation, doublecheck setters (run setters option) and virtuals
const UserSchema = new Schema(
  {
    email: {
      type: String,
      index: { unique: true }, // double check that this is correct
      required: true,
      trim: true,
      minlength: 1,
      unique: true,
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
    tokens: [
      {
        access: {
          type: String,
          required: true,
        },
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    // TODO: double check all below
    timestamps: true,
    runSettersOnQuery: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
);

// UserSchema.virtual('endpoint').get(function endpoint() {
//   return `/users/${this._id}`;
// });
// UserSchema.virtual('apps', {
//   ref: 'app',
//   localField: '_id',
//   foreignField: 'categories',
// });
UserSchema.plugin(uniqueValidator);

const User = mongoose.model('user', UserSchema);

module.exports = User;
