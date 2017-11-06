const App = require('../models/iosApp');
const Developer = require('../models/developer');
const Category = require('../models/category');
const { ObjectId } = require('mongodb');

/*
exports.appCreate = function (req, res, next) {
  var app = new App({
    trackId: req.body.trackId,
    trackName: req.body.trackName,
    trackCensoredName: req.body.trackCensoredName,
    trackViewUrl: req.body.trackViewUrl,
    // developer: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'developer',
    // },
    artistId: req.body.artistId,
    artistName: req.body.artistName,
    artistViewUrl: req.body.artistViewUrl,
    sellerName: req.body.sellerName,
    sellerUrl: req.body.sellerUrl,
    artworkUrl60: req.body.artworkUrl60,
    artworkUrl100: req.body.artworkUrl100,
    artworkUrl512: req.body.artworkUrl512,
    screenshotUrls: req.body.screenshotUrls,
    ipadScreenshotUrls: req.body.ipadScreenshotUrls,
    appletvScreenshotUrls: req.body.appletvScreenshotUrls,
    price: req.body.price,
    formattedPrice: req.body.formattedPrice,
    currency: req.body.currency,
    fileSizeBytes: req.body.fileSizeBytes,
    version: req.body.version,
    currentVersionReleaseDate: req.body.currentVersionReleaseDate,
    releaseDate: req.body.releaseDate,
    releaseNotes: req.body.releaseNotes,
    description: req.body.description,
    averageUserRating: req.body.averageUserRating,
    userRatingCount: req.body.userRatingCount,
    averageUserRatingForCurrentVersion: req.body.averageUserRatingForCurrentVersion,
    userRatingCountForCurrentVersion: req.body.userRatingCountForCurrentVersion,
    bundleId: req.body.bundleId,
    primaryGenreId: req.body.primaryGenreId,
    primaryGenreName: req.body.primaryGenreName,
    // genres: [{
    //   type: Schema.Types.ObjectId,
    //   ref: 'genre',
    // }],
    genreIds: req.body.genreIds,
    genres: req.body.genres,
    kind: req.body.kind,
    wrapperType: req.body.wrapperType,
    minimumOsVersion: req.body.minimumOsVersion,
    trackContentRating: req.body.trackContentRating,
    contentAdvisoryRating: req.body.contentAdvisoryRating,
    isGameCenterEnabled: req.body.isGameCenterEnabled,
    isVppDeviceBasedLicensingEnabled: req.body.isVppDeviceBasedLicensingEnabled,
    features: req.body.features,
    supportedDevices: req.body.supportedDevices,
    advisories: req.body.advisories,
    languageCodesISO2A: req.body.languageCodesISO2A,
  });

  app.save().then((err, data) => {
    if (err => next(err));

    // TODO: double check that I'm doing the error handling correctly!
    res.send('created an app!');
  });

  // res.send('function for creating an app');
};
*/

exports.appCreate = async function (req, res, next) {
  // check if dev exists
  var dev = {
    id: req.body.artistId,
    name: req.body.artistName,
    nameFull: req.body.sellerName,
    urlApple: req.body.artistViewUrl,
    urlDeveloper: req.body.sellerUrl,
  };

  // get categories
  var genreIds = req.body.genreIds.map(id => +id);
  var categories = await Category.find({});
  categories = categories.filter(cat => genreIds.includes(cat.id)).map(cat => cat._id);

  // use the async npm module??

  // create the app model
  let app = new App({
    id: req.body.trackId,
    name: req.body.trackName,
    nameCensored: req.body.trackCensoredName,
    url: req.body.trackViewUrl,
    // developer: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'developer',
    // },
    images: {
      iconUrl60: req.body.artworkUrl60,
      iconUrl100: req.body.artworkUrl100,
      iconUrl512: req.body.artworkUrl512,
      iPhoneScreenshotUrls: req.body.screenshotUrls,
      iPadScreenshotUrls: req.body.ipadScreenshotUrls,
      appleTvSreenshotUrls: req.body.appletvScreenshotUrls,
    },
    price: req.body.price,
    priceFormatted: req.body.formattedPrice,
    currency: req.body.currency,
    fileSizeBytes: req.body.fileSizeBytes,
    fileSizeFormatted: req.body.fileSizeBytes,
    version: req.body.version,
    lastChecked: Date(),
    releaseDateCurrentVersion: new Date(req.body.currentVersionReleaseDate),
    releaseDateOriginal: new Date(req.body.releaseDate),
    releaseNotes: req.body.releaseNotes,
    description: req.body.description,
    userRatingAverageLifetime: req.body.averageUserRating,
    userRatingCountLifetime: req.body.userRatingCount,
    userRatingAverageCurrentVersion: req.body.averageUserRatingForCurrentVersion,
    userRatingCountCurrentVersion: req.body.userRatingCountForCurrentVersion,
    bundleId: req.body.bundleId,
    categories: categories,
    kind: req.body.kind,
    minimumOsVersion: req.body.minimumOsVersion,
    contentRating: req.body.trackContentRating,
    contentAdvisoryRating: req.body.contentAdvisoryRating,
    isGameCenterEnabled: req.body.isGameCenterEnabled,
    isVppDeviceBasedLicensingEnabled: req.body.isVppDeviceBasedLicensingEnabled,
    languageCodesISO2A: req.body.languageCodesISO2A,
    advisories: req.body.advisories,
    supportedDevices: req.body.supportedDevices,
    features: req.body.features,
  });

  // save
  var saved = await app.save();

  res.send(saved);

};

exports.appDetail = async function (req, res, next) {
  let id = req.params.id;

  if (!ObjectId.isValid(id)) throw new Error('invalid object id!');

  let app = await AppNew.find({ _id: id }).populate('categories');

  res.send(app);

  // TODO: figure out what I really want to send
  // TODO: is throwing a new error good enough? Need to specify where it came from!
};

exports.appUpdate = function (req, res) {
  res.send('function for updating an individual app');
};

exports.appDelete = function (req, res) {
  res.send('function for deleteing an individual app');
};

exports.appList = function (req, res) {
  res.send('function for getting a list of apps');
};

/* TODO: look into the following tools:
  https://www.npmjs.com/package/helmet
  https://keymetrics.io/
  http://pm2.keymetrics.io/docs/usage/cluster-mode/
  https://www.loggly.com/product/
  https://jasmine.github.io/2.0/node.html
  https://github.com/visionmedia/supertest
*/
