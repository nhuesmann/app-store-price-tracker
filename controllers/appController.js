const request = require('request-promise');
const { ObjectId } = require('mongodb');

const App = require('../models/iosapp');
const Developer = require('../models/developer');
const Category = require('../models/category');

const appCreate = async function appCreate(app) {
  // Load all categories and find or create the developer
  const categoriesQuery = Category.find({});
  const developerQuery = Developer.findOneAndUpdate(
    {
      id: app.artistId,
    },
    {
      id: app.artistId,
      name: app.artistName,
      nameFull: app.sellerName,
      url: app.artistViewUrl,
    },
    {
      new: true,
      upsert: true,
    },
  );

  // Run the queries. If developer query fails as result of duplicate insert, run it again
  // TODO: implement recursion here?
  const [developer, categoriesAll] = await Promise.all([
    developerQuery.exec().catch((e) => {
      if (e.code === 11000) {
        return developerQuery.exec();
      }
      throw new Error(e);
    }),
    categoriesQuery.exec(),
  ]);

  // Retrieve the ObjectIds of the current app's categories
  const genreIds = app.genreIds.map(id => +id);
  const categories = categoriesAll.filter(cat => genreIds.includes(cat.id)).map(cat => cat._id);

  // Create the App instance
  const newApp = new App({
    id: app.trackId,
    name: app.trackName,
    nameCensored: app.trackCensoredName,
    url: app.trackViewUrl,
    developer: developer._id,
    devId: developer.id,
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
    categories,
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
};

const appCreateBatch = async function appCreateBatch(ids) {
  const apps = await request({
    uri: `https://itunes.apple.com/lookup?id=${ids}`,
    json: true,
  });

  return Promise.all(apps.results.map(app => appCreate(app)));
};

exports.appCreateOne = async function appCreateOne(req, res, next) {
  const appSaved = await appCreate(req.body);
  res.send(appSaved);
};

exports.appDetail = async function appDetail(req, res, next) {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) throw new Error('invalid object id!');

  const app = await App.findOne({ _id: id })
    .populate('developer', ['id', 'name', 'nameFull', 'url'])
    .populate('categories', ['id', 'name', 'url']);

  res.send(app);

  // TODO: is throwing a new error good enough? Need to specify where it came from!
};

exports.appUpdate = async function appUpdate(req, res) {
  res.send('function for updating an individual app');
};

exports.appDelete = async function appDelete(req, res) {
  res.send('function for deleting an individual app');
};

exports.appsList = async function appsList(req, res, next) {
  res.send('function for getting a list of apps');
};

exports.appCreateBatchTest = async function appCreateBatchTest(req, res, next) {
  const appsSaved = await appCreateBatch(req.body.ids);

  res.send(appsSaved);
};

exports.appGetMetadataById = async function appGetMetadataById(req, res, next) {
  const response = await request({
    uri: `https://itunes.apple.com/lookup?id=${req.params.id}`,
    json: true,
  });

  res.json(response.results[0]);
};

exports.appsNew = async function appsNew(req, res, next) {
  let ids = await request({
    uri: 'https://itunes.apple.com/us/rss/newapplications/json',
    json: true,
  });

  ids = ids.feed.entry.map(entry => entry.id.attributes['im:id']).join(',');
  const appsSaved = await appCreateBatch(ids);

  res.send(appsSaved);
};

exports.appsAppleRss = async function appsAppleRss(req, res, next) {
  let ids = await request({
    uri: `https://rss.itunes.apple.com/api/v1/us/ios-apps/${req.query.feed}/all/${
      req.query.qty
    }/explicit.json`,
    json: true,
  });

  ids = ids.feed.results.map(app => app.id).join(',');
  const appsSaved = await appCreateBatch(ids);

  res.send(appsSaved);
};

/* TODO: look into the following tools:
  https://www.npmjs.com/package/helmet
  https://keymetrics.io/
  http://pm2.keymetrics.io/docs/usage/cluster-mode/
  https://www.loggly.com/product/
  https://jasmine.github.io/2.0/node.html
  https://github.com/visionmedia/supertest
*/
