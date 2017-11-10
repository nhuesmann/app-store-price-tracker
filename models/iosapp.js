const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const AppSchema = new Schema({
  id: {
    type: Number,
    index: { unique: true },
  },
  name: String,
  nameCensored: String,
  url: {
    type: String,
    set: cleanUrl,
  },
  developer: {
    type: Schema.Types.ObjectId,
    ref: 'developer',
  },
  images: {
    iconUrl60: String,
    iconUrl100: String,
    iconUrl512: String,
    iPhoneScreenshotUrls: Array,
    iPadScreenshotUrls: Array,
    appleTvSreenshotUrls: Array,
  },
  price: Number,
  priceFormatted: String,
  currency: String,
  fileSizeBytes: String,
  fileSizeFormatted: {
    type: String,
    set: fileSizeFormatted,
  },
  version: String,
  lastUpdated: Date, // TODO: dbl check... use this for keeping track of when the last query was run
  releaseDateCurrentVersion: Date,
  releaseDateOriginal: Date,
  releaseNotes: String,
  description: String,
  rating: {
    current: {
      averageUserRating: Number,
      userRatingCount: Number,
    },
    lifetime: {
      averageUserRating: Number,
      userRatingCount: Number,
    },
  },
  bundleId: String,
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'category',
    },
  ],
  kind: String,
  minimumOsVersion: String,
  contentRating: String,
  contentAdvisoryRating: String,
  isGameCenterEnabled: Boolean,
  languageCodesISO2A: Array,
  advisories: Array,
  supportedDevices: Array,
  features: Array,
}, {
  timestamps: true,
  runSettersOnQuery: true,
});

function cleanUrl(url) {
  return url ? url.replace(/\?(.*)/g, '') : '';
}

function fileSizeFormatted(bytes) {
  const toMegabytes = function (byte) {
    return `${Math.floor(+byte / 1000000)} MB`;
  };

  const toGigabytes = function (byte) {
    byte = +byte / 1000000000;
    var byteString = byte.toFixed(2) == Math.floor(byte)
      ? `${Math.floor(byte)} GB`
      : `${byte.toFixed(2)} GB`;

    return byteString;
  };

  if (bytes < 1000000000) {
    return toMegabytes(bytes);
  } else {
    return toGigabytes(bytes);
  }
}

AppSchema.virtual('endpoint').get(() => `/app/${this._id}`);
AppSchema.plugin(uniqueValidator);

const App = mongoose.model('app', AppSchema);

module.exports = App;