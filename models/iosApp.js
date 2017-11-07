const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppSchema = new Schema({
  id: Number, // trackId
  name: String, // trackName
  nameCensored: String, // trackCensoredName
  url: String, // trackViewUrl
  developer: {
    type: Schema.Types.ObjectId,
    ref: 'developer',
  },
  images: {
    iconUrl60: String, // artworkUrl60
    iconUrl100: String, // artworkUrl100
    iconUrl512: String, // artworkUrl512
    iPhoneScreenshotUrls: Array, // screenshotUrls
    iPadScreenshotUrls: Array, // ipadScreenshotUrls
    appleTvSreenshotUrls: Array, // appletvScreenshotUrls
  },
  price: Number, // price
  priceFormatted: String, // formattedPrice
  currency: String, // currency
  fileSizeBytes: String, // fileSizeBytes
  fileSizeFormatted: { // fileSizeBytes (gets fed to this)
    type: String,
    set: fileSizeFormatted,
  },
  version: String, // version
  lastUpdated: Date, // use this for keeping track of when the last query was run
  releaseDateCurrentVersion: Date, // currentVersionReleaseDate
  releaseDateOriginal: Date, // releaseDate
  releaseNotes: String, // releaseNotes
  description: String, // description
  userRatingAverageLifetime: Number, // averageUserRating
  userRatingCountLifetime: Number, // userRatingCount
  userRatingAverageCurrentVersion: Number, // averageUserRatingForCurrentVersion
  userRatingCountCurrentVersion: Number, // userRatingCountForCurrentVersion
  bundleId: String, // bundleId
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'category',
  }],
  kind: String, // kind
  minimumOsVersion: String, // minimumOsVersion
  contentRating: String, // trackContentRating
  contentAdvisoryRating: String, // contentAdvisoryRating
  isGameCenterEnabled: Boolean, // isGameCenterEnabled
  languageCodesISO2A: Array, // languageCodesISO2A
  advisories: Array, // advisories
  supportedDevices: Array, // supportedDevices
  features: Array, // features
});

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

const App = mongoose.model('app', AppSchema);

module.exports = App;
