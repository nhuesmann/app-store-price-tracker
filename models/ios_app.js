const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppSchema = new Schema({
  trackId: {
    type: Number,
    required: [true, 'trackId is required.']
  },
  trackName: {
    type: String,
    required: [true, 'trackName is required.']
  },
  trackCensoredName: {
    type: String,
    required: [true, 'trackCensoredName is required.']
  },
  trackViewUrl: {
    type: String,
    required: [true, 'trackViewUrl is required.']
  },
  artistId: {
    type: Number,
    required: [true, 'artistId is required.']
  },
  artistName: {
    type: String,
    required: [true, 'artistName is required.']
  },
  artistViewUrl: {
    type: String,
    required: [true, 'artistViewUrl is required.']
  },
  sellerName: {
    type: String,
    required: [true, 'sellerName is required.']
  },
  sellerUrl: {
    type: String,
    required: [true, 'sellerUrl is required.']
  },
  artworkUrl60: {
    type: String,
    required: [true, 'artworkUrl60 is required.']
  },
  artworkUrl100: {
    type: String,
    required: [true, 'artworkUrl100 is required.']
  },
  artworkUrl512: {
    type: String,
    required: [true, 'artworkUrl512 is required.']
  },
  screenshotUrls: {
    type: Array,
    required: [true, 'screenshotUrls is required.']
  },
  ipadScreenshotUrls: {
    type: Array,
    required: [true, 'ipadScreenshotUrls is required.']
  },
  appletvScreenshotUrls: {
    type: Array,
    required: [true, 'appletvScreenshotUrls is required.']
  },
  price: {
    type: Number,
    required: [true, 'price is required.']
  },
  formattedPrice: {
    type: String,
    required: [true, 'formattedPrice is required.']
  },
  currency: {
    type: String,
    required: [true, 'currency is required.']
  },
  fileSizeBytes: {
    type: String,
    required: [true, 'fileSizeBytes is required.']
  },
  version: {
    type: String,
    required: [true, 'version is required.']
  },
  currentVersionReleaseDate: {
    type: String,
    required: [true, 'currentVersionReleaseDate is required.']
  },
  releaseDate: {
    type: String,
    required: [true, 'releaseDate is required.']
  },
  releaseNotes: {
    type: String,
    required: [true, 'releaseNotes is required.']
  },
  description: {
    type: String,
    required: [true, 'description is required.']
  },
  averageUserRating: {
    type: Number,
    required: [true, 'averageUserRating is required.']
  },
  userRatingCount: {
    type: Number,
    required: [true, 'userRatingCount is required.']
  },
  averageUserRatingForCurrentVersion: {
    type: Number,
    required: [true, 'averageUserRatingForCurrentVersion is required.']
  },
  userRatingCountForCurrentVersion: {
    type: Number,
    required: [true, 'userRatingCountForCurrentVersion is required.']
  },
  bundleId: {
    type: String,
    required: [true, 'bundleId is required.']
  },
  primaryGenreId: {
    type: Number,
    required: [true, 'primaryGenreId is required.']
  },
  primaryGenreName: {
    type: String,
    required: [true, 'primaryGenreName is required.']
  },
  genreIds: {
    type: Array,
    required: [true, 'genreIds is required.']
  },
  genres: {
    type: Array,
    required: [true, 'genres is required.']
  },
  kind: {
    type: String,
    required: [true, 'kind is required.']
  },
  wrapperType: {
    type: String,
    required: [true, 'wrapperType is required.']
  },
  minimumOsVersion: {
    type: String,
    required: [true, 'minimumOsVersion is required.']
  },
  trackContentRating: {
    type: String,
    required: [true, 'trackContentRating is required.']
  },
  contentAdvisoryRating: {
    type: String,
    required: [true, 'contentAdvisoryRating is required.']
  },
  isGameCenterEnabled: {
    type: Boolean,
    required: [true, 'isGameCenterEnabled is required.']
  },
  isVppDeviceBasedLicensingEnabled: {
    type: Boolean,
    required: [true, 'isVppDeviceBasedLicensingEnabled is required.']
  },
  features: {
    type: Array,
    required: [true, 'features is required.']
  },
  supportedDevices: {
    type: Array,
    required: [true, 'supportedDevices is required.']
  },
  advisories: {
    type: Array,
    required: [true, 'advisories is required.']
  },
  languageCodesISO2A: {
    type: Array,
    required: [true, 'languageCodesISO2A is required.']
  }
});

const App = mongoose.model('app', AppSchema);

module.exports = App;
