const mongoose = require('mongoose');

const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

/* THIS IS ANDREW'S VERSION, edit this and work on AUTH
const UserSchema = new Schema({
  email: {
    type: String,
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
    minlength: 6,
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
});
*/

/*
const UserSchema = new Schema(
  {
    id: {
      type: Number,
      index: { unique: true },
    },
    name: String,
    url: {
      type: String,
      set: cleanUrl,
    },
  },
  {
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
*/

// UserSchema.virtual('endpoint').get(() => `/user/${this._id}`);
// UserSchema.virtual('apps', {
//   ref: 'app',
//   localField: '_id',
//   foreignField: 'categories',
// });
UserSchema.plugin(uniqueValidator);

const User = mongoose.model('user', UserSchema);

module.exports = User;
