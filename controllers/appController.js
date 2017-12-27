const request = require('request-promise');
const { ObjectId } = require('mongodb');

const App = require('../models/iosapp');
const Developer = require('../models/developer');
const Category = require('../models/category');

// Accepts an id string or comma separated string of ids, returns iTunes app data
const getAppData = async function getAppData(ids) {
  // add function in here that splits up into batches of 200 and joins them?
  // OR, should that be delegated beforehand?
  // PROB THE LATTER

  return request({
    uri: `https://itunes.apple.com/lookup?id=${ids}`,
    json: true,
  });
};

// Function for submitting a single app to the db. Receives a JSON body as param.
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
      sellerName: app.sellerName,
      url: app.artistViewUrl,
    },
    {
      new: true,
      upsert: true,
    },
  );

  // Run the queries. If developer query fails as result of duplicate insert, run it again
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
  const response = await getAppData(ids.join(','));
  return Promise.all(response.results.map(app => appCreate(app)));
};

/* ////////////////////////////////         EXPORTS         //////////////////////////////// */

// NEED TO WRITE, retrieve a list of apps
exports.ListApps = async function ListApps(req, res, next) {
  res.send('function for getting a list of apps');
};

// GET: /apps/:id
// Retrieves app detail from db for a single app. Receives object id and queries db.
exports.GetApp = async function GetApp(req, res, next) {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) throw new Error('invalid object id!');

  const app = await App.findOne({ _id: id })
    .populate('developer', ['id', 'name', 'nameFull', 'url'])
    .populate('categories', ['id', 'name', 'url']);

  res.send(app);

  // TODO: is throwing a new error good enough? Need to specify where it came from!
};

// POST: /apps
// Creates a single app. Receives a JSON body of the app and calls appCreate.
exports.CreateApp = async function CreateApp(req, res, next) {
  const appSaved = await appCreate(req.body);
  res.send(appSaved);
};

/*
 * POST: /apps:BatchCreate
 * Creates a batch of apps. Receives a comma separated string of trackids and
 * calls iTunes then appCreate.
 */
exports.batchCreate = async function batchCreate(req, res, next) {
  const appsSaved = await appCreateBatch(req.body.ids);
  res.send(appsSaved);
};

// TODO BATCH UPDATE!
// should there even be a batch create? should it always check if present and
// never assume it doesn't exist??
exports.batchUpdate = async function batchUpdate(req, res, next) {
  // const appsSaved = await appCreateBatch(req.body.ids);
  // res.send(appsSaved);
};

exports.UpdateApp = async function UpdateApp(req, res, next) {
  res.send('function for updating an individual app');
};

exports.DeleteApp = async function DeleteApp(req, res) {
  res.send('function for deleting an individual app');
};

/* ////////////////////////////////         TESTING         //////////////////////////////// */

exports.appGetMetadataById = async function appGetMetadataById(req, res, next) {
  const response = await request({
    uri: `https://itunes.apple.com/lookup?id=${req.params.id}`,
    json: true,
  });

  res.json(response.results[0]);
};

// TODO: THIS SHOULD ALSO NOT ASSUME THAT THE APPS DON'T EXIST ALREADY
// Maybe the batch function should just be a create or update function?
// There should only be batch update, not batch create
// TODO: SO, should it be a PUT request instead? Or what? Do I separate out the
// POST batchCreate from a PUT batchUpdate??
exports.appsNew = async function appsNew(req, res, next) {
  let ids = await request({
    uri: 'https://itunes.apple.com/us/rss/newapplications/json',
    json: true,
  });

  ids = ids.feed.entry.map(entry => entry.id.attributes['im:id']);
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
