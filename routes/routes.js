const router = require('express').Router();

const asyncWrapper = require('../middlewares/asyncWrapper');

const appController = require('../controllers/appController');
const categoryController = require('../controllers/categoryController');
const developerController = require('../controllers/developerController');

/* //////////////////                APPS                 ////////////////// */

/* GET request for all App TODO: decide how to limit this... can't reply with all */
/* use pagination and query params for filter: https://cloud.google.com/apis/design/standard_methods#list  */
router.get('/apps', asyncWrapper(appController.ListApps));

/* GET request for one App */
router.get('/apps/:id', asyncWrapper(appController.GetApp));

/* POST request for creating an App */
router.post('/apps', asyncWrapper(appController.CreateApp));

/* POST request for creating multiple Apps */
router.post('/apps:batchCreate', asyncWrapper(appController.batchCreate));

/* PUT request to update an App */
router.put('/apps/:id', asyncWrapper(appController.UpdateApp));

/* DELETE request to delete an App */
router.delete('/apps/:id', asyncWrapper(appController.DeleteApp));

/* //////////////////             TESTING             ////////////////// */

const rootTest = async function rootTest(req, res, next) {
  res.status(200).json({ message: 'Connected successfully' });
};

/* GET base request for API */
router.get('/', asyncWrapper(rootTest));

/* GET request for new Apps from iTunes RSS feed */
router.get('/apps:getNew', asyncWrapper(appController.appsNew));

/* GET request for any curated iTunes RSS feed */
router.get('/apps/rss', asyncWrapper(appController.appsAppleRss));

/* PATCH request to batch update multiple Apps */
router.patch('/apps', asyncWrapper(appController.appUpdateBatch));

/* GET request for getting app metadata (for testing - add to test suite?) */
router.get('/app/itunes/:id', asyncWrapper(appController.appGetMetadataById));

/* //////////////////             CATEGORIES             ////////////////// */

/* GET request for all Categories TODO: decide how to limit this... can't reply with all */
/* use pagination and query params for filter: https://cloud.google.com/apis/design/standard_methods#list  */
// router.get('/categories', asyncWrapper(categoryController.ListCategories));

/* GET request for one Category */
router.get('/categories/:id', asyncWrapper(categoryController.GetCategory));

/* POST request for creating a Category */
// router.post('/categories', asyncWrapper(categoryController.CreateCategory));

/* GET request for syncing all Categories from iTunes using RSS */
router.get('/categories:sync', asyncWrapper(categoryController.sync));

/* GET request for syncing all Categories from iTunes using scraper */
router.get('/categories:syncScrape', asyncWrapper(categoryController.syncScrape));

/* //////////////////             DEVELOPERS             ////////////////// */

/* GET request for one Developer */
router.get('/developers/:id', asyncWrapper(developerController.GetDeveloper));

/* PUT request to update a Developer */
router.put('/developers/:id', asyncWrapper(developerController.UpdateDeveloper));

module.exports = router;
