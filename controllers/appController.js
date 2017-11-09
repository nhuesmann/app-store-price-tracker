const { ObjectId } = require('mongodb');
const request = require('request-promise'); // TODO: prob wont need this for other than testing

const App = require('../models/iosApp');
const Developer = require('../models/developer');
const Category = require('../models/category');

exports.appCreate = async function (req, res, next) {
  // Check if developer already exists and load all categories
  let developerQuery = Developer.findOne({ id: req.body.artistId });
  let categoriesQuery = Category.find({});
  let [developer, categories] = await Promise.all([developerQuery.exec(), categoriesQuery.exec()]);

  // TODO: add regex to urls in dev to cleanse them! Same with categories
  // find out why no sellerurl... where was i getting it? Clash royale?
  // should i implement find one and update here too???

  // If developer doesn't exist, create document
  if (!developer) {
    developer = new Developer({
      id: req.body.artistId,
      name: req.body.artistName,
      nameFull: req.body.sellerName,
      urlApple: req.body.artistViewUrl,
      urlDeveloper: req.body.sellerUrl,
    });

    developer = await developer.save();
  }

  // Retrieve the ObjectIds of the current app's categories
  let genreIds = req.body.genreIds.map(id => +id);
  categories = categories.filter(cat => genreIds.includes(cat.id)).map(cat => cat._id);

  // Create the App instance
  let app = new App({
    id: req.body.trackId,
    name: req.body.trackName,
    nameCensored: req.body.trackCensoredName,
    url: req.body.trackViewUrl,
    developer: developer._id,
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
    lastUpdated: Date(),
    releaseDateCurrentVersion: new Date(req.body.currentVersionReleaseDate),
    releaseDateOriginal: new Date(req.body.releaseDate),
    releaseNotes: req.body.releaseNotes,
    description: req.body.description,
    rating: {
      current: {
        averageUserRating: req.body.averageUserRatingForCurrentVersion,
        userRatingCount: req.body.userRatingCountForCurrentVersion,
      },
      lifetime: {
        averageUserRating: req.body.averageUserRating,
        userRatingCount: req.body.userRatingCount,
      },
    },
    bundleId: req.body.bundleId,
    categories: categories,
    kind: req.body.kind,
    minimumOsVersion: req.body.minimumOsVersion,
    contentRating: req.body.trackContentRating,
    contentAdvisoryRating: req.body.contentAdvisoryRating,
    isGameCenterEnabled: req.body.isGameCenterEnabled,
    languageCodesISO2A: req.body.languageCodesISO2A,
    advisories: req.body.advisories,
    supportedDevices: req.body.supportedDevices,
    features: req.body.features,
  });

  let appSaved = await app.save();

  res.send(appSaved);
};

exports.appDetail = async function (req, res, next) {
  let id = req.params.id;

  if (!ObjectId.isValid(id)) throw new Error('invalid object id!');

  // TODO: check if another way to do this - not wanting the timestamp fields...
  let app = await App.find({ _id: id })
    .populate('developer', ['id', 'name', 'nameFull', 'urlApple', 'urlDeveloper'])
    .populate('categories', ['id', 'name', 'url']);

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

exports.appsList = async function (req, res, next) {
  res.send('function for getting a list of apps');
};

exports.appBatchCreate = async function (req, res, next) {
  res.send('function for batch creating');
};

exports.appGetMetadataById = async function (req, res, next) {
  let id = req.params.id;

  let response = await request({
    uri: `https://itunes.apple.com/lookup?id=${id}`,
    json: true,
  });

  res.json(response.results[0]);
};

exports.appsNew = async function (req, res, next) {
  const homePage = 'https://itunes.apple.com/us/rss/newapplications/json';

  let newApps = await request(homePage);

  let ids = JSON.parse(newApps).feed.entry.map(entry => entry.id.attributes['im:id']);

  // call the endpoint that takes a list of ids as input to call iTunes then create or update apps

  res.send(ids);
};

/* TODO: look into the following tools:
  https://www.npmjs.com/package/helmet
  https://keymetrics.io/
  http://pm2.keymetrics.io/docs/usage/cluster-mode/
  https://www.loggly.com/product/
  https://jasmine.github.io/2.0/node.html
  https://github.com/visionmedia/supertest
*/
