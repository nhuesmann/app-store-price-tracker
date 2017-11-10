const { ObjectId } = require('mongodb');
const request = require('request-promise');

const App = require('../models/iosApp');
const Developer = require('../models/developer');
const Category = require('../models/category');

exports.appCreateOne = async function (req, res, next) {
  let appSaved = await appCreate(req.body);
  res.send(appSaved);
};

exports.appDetail = async function (req, res, next) {
  let id = req.params.id;

  if (!ObjectId.isValid(id)) throw new Error('invalid object id!');

  let app = await App.find({ _id: id })
    .populate('developer', ['id', 'name', 'nameFull', 'url'])
    .populate('categories', ['id', 'name', 'url']);

  res.send(app);

  // TODO: is throwing a new error good enough? Need to specify where it came from!
};

exports.appUpdate = async function (req, res) {
  res.send('function for updating an individual app');
};

exports.appDelete = async function (req, res) {
  res.send('function for deleteing an individual app');
};

exports.appsList = async function (req, res, next) {
  res.send('function for getting a list of apps');
};

exports.appCreateBatch = async function (req, res, next) {
  let apps = await request({
    uri: `https://itunes.apple.com/lookup?id=${req.body.ids}`,
    json: true,
  });
  let appsSaved = await Promise.all(apps.results.map(app => appCreate(app)));

  res.send({
    itunesResults: apps.results.length,
    numInserted: appsSaved.length,
    inserted: appsSaved,
  });
};

exports.appGetMetadataById = async function (req, res, next) {
  let response = await request({
    uri: `https://itunes.apple.com/lookup?id=${req.params.id}`,
    json: true,
  });

  res.json(response.results[0]);
};

//TODO: probably needs its own function since response is diff format from other RSS
exports.appsNew = async function (req, res, next) {
  let ids = await request({
    uri: 'https://itunes.apple.com/us/rss/newapplications/json',
    json: true,
  });

  ids = ids.feed.entry.map(entry => entry.id.attributes['im:id']).join(',');

  // call the endpoint that takes a list of ids as input to call iTunes then create or update apps

  res.send(ids);
};

// TODO: should app take the uri as argument? One app for all the rss ones with same format
exports.appsAppleRss = async function (req, res, next) {
  let ids = await request({
    uri: `https://rss.itunes.apple.com/api/v1/us/ios-apps/${req.query.feed}/all/${req.query.qty}/explicit.json`,
    json: true,
  });

  ids = ids.feed.results.map(app => app.id).join(',');

  res.send(ids);
};

async function appCreate(app) {
  // Load all categories and find or create the developer
  let categoriesQuery = Category.find({});
  let developerQuery = Developer.findOneAndUpdate(
    {
      id: app.artistId,
    }, {
      id: app.artistId,
      name: app.artistName,
      nameFull: app.sellerName,
      url: app.artistViewUrl,
    }, {
      new: true, upsert: true,
    },
  );

  // Run the queries. If developer query fails as result of duplicate insert, run it again
  // TODO: implement recursion here?
  let [developer, categories] = await Promise.all([
    developerQuery.exec()
      .catch(e => {
        if (e.code === 11000) {
          return developerQuery.exec();
        } else {
          throw new Error(e);
        }
      }),
    categoriesQuery.exec(),
  ]);

  // Retrieve the ObjectIds of the current app's categories
  let genreIds = app.genreIds.map(id => +id);
  categories = categories.filter(cat => genreIds.includes(cat.id)).map(cat => cat._id);

  // Create the App instance
  let newApp = new App({
    id: app.trackId,
    name: app.trackName,
    nameCensored: app.trackCensoredName,
    url: app.trackViewUrl,
    developer: developer._id,
    images: {
      iconUrl60: app.artworkUrl60,
      iconUrl100: app.artworkUrl100,
      iconUrl512: app.artworkUrl512,
      iPhoneScreenshotUrls: app.screenshotUrls,
      iPadScreenshotUrls: app.ipadScreenshotUrls,
      appleTvSreenshotUrls: app.appletvScreenshotUrls,
    },
    price: app.price,
    priceFormatted: app.formattedPrice,
    currency: app.currency,
    fileSizeBytes: app.fileSizeBytes,
    fileSizeFormatted: app.fileSizeBytes,
    version: app.version,
    lastUpdated: Date(),
    releaseDateCurrentVersion: new Date(app.currentVersionReleaseDate),
    releaseDateOriginal: new Date(app.releaseDate),
    releaseNotes: app.releaseNotes,
    description: app.description,
    rating: {
      current: {
        averageUserRating: app.averageUserRatingForCurrentVersion,
        userRatingCount: app.userRatingCountForCurrentVersion,
      },
      lifetime: {
        averageUserRating: app.averageUserRating,
        userRatingCount: app.userRatingCount,
      },
    },
    bundleId: app.bundleId,
    categories: categories,
    kind: app.kind,
    minimumOsVersion: app.minimumOsVersion,
    contentRating: app.trackContentRating,
    contentAdvisoryRating: app.contentAdvisoryRating,
    isGameCenterEnabled: app.isGameCenterEnabled,
    languageCodesISO2A: app.languageCodesISO2A,
    advisories: app.advisories,
    supportedDevices: app.supportedDevices,
    features: app.features,
  });

  return newApp.save();
}

/* TODO: look into the following tools:
  https://www.npmjs.com/package/helmet
  https://keymetrics.io/
  http://pm2.keymetrics.io/docs/usage/cluster-mode/
  https://www.loggly.com/product/
  https://jasmine.github.io/2.0/node.html
  https://github.com/visionmedia/supertest
*/
