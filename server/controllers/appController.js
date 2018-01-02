const request = require('request-promise');
const { ObjectId } = require('mongodb');
const apiError = require('../helpers/error');

const App = require('../models/app');
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
      runValidators: true, // for 'mongoose-unique-validator', to ensure unique. test with same dev
      context: 'query',
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

const appUpdateBatch = async function appUpdateBatch(ids) {
  const response = await getAppData(ids.join(','));

  // TODO: need to think about this. how can i upsert if the dev has not been
  // made? I would need to follow the app create function's logic still with
  // find one and update. I just need to think about flow:
  // - we KNOW the app exists because it is triggering the update
  // - call iTunes with the ids
  // - NEED NEW PROPS: alertPriceChange: Boolean, alertUpdated: Boolean
  //    - these should be getters/setters? running on an update? or what?
  //    - if either happened, fill that field
  // - update the app with the whole response from iTunes
  // - update the dev too?? bc what if they changed info
  // - it is basically the exact createApp function but with update...
  // - need to figure out how to implement

  // return Promise.all(response.results.map(app => appCreate(app)));
}

/* ////////////////////////////////         EXPORTS         //////////////////////////////// */

// NEED TO WRITE, retrieve a list of apps
exports.ListApps = async function ListApps(req, res, next) {
  const { test } = req.query;

  if (!test) {
    return res.status(404).json(apiError.zeroResults('app'));
  }

  res.json('function for getting a list of apps');
};

// GET: /apps/:id
// Retrieves app detail from db for a single app. Receives object id and queries db.
exports.GetApp = async function GetApp(req, res, next) {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json(apiError.nonObjectID());
  }

  const app = await App.findOne({ _id: id })
    .populate('developer', ['id', 'name', 'nameFull', 'url'])
    .populate('categories', ['id', 'name', 'url']);

  if (!app) {
    return res.status(400).json(apiError.zeroResults('app'));
  }

  res.json(app);

  // TODO: is throwing a new error good enough? Need to specify where it came from!
};

// POST: /apps
// Creates a single app. Receives a JSON body of the app and calls appCreate.
exports.CreateApp = async function CreateApp(req, res, next) {
  const appSaved = await appCreate(req.body);
  res.json(appSaved);
};

/*
 * POST: /apps:BatchCreate
 * Creates a batch of apps. Receives a comma separated string of trackids and
 * calls iTunes then appCreate.
 */
exports.batchCreate = async function batchCreate(req, res, next) {
  const appsSaved = await appCreateBatch(req.body.ids);
  res.json(appsSaved);
};

// TODO BATCH UPDATE!
// should there even be a batch create? should it always check if present and
// never assume it doesn't exist??
exports.batchUpdate = async function batchUpdate(req, res, next) {
  // const appsSaved = await appCreateBatch(req.body.ids);
  // res.json(appsSaved);
};

exports.UpdateApp = async function UpdateApp(req, res, next) {
  res.json('function for updating an individual app');
};

exports.DeleteApp = async function DeleteApp(req, res) {
  res.json('function for deleting an individual app');
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

  res.json(appsSaved);
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

  res.json(appsSaved);
};

/* TODO: look into the following tools:
  https://www.npmjs.com/package/helmet
  https://keymetrics.io/
  http://pm2.keymetrics.io/docs/usage/cluster-mode/
  https://www.loggly.com/product/
  https://jasmine.github.io/2.0/node.html
  https://github.com/visionmedia/supertest
*/
