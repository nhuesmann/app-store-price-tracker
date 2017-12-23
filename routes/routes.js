const express = require('express');

const router = express.Router();

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
router.delete('/app/:id', asyncWrapper(appController.DeleteApp));

/* //////////////////             TESTING             ////////////////// */

/* GET request for new Apps from iTunes RSS feed */
router.get('/apps:getNew', asyncWrapper(appController.appsNew));

/* GET request for any curated iTunes RSS feed */
router.get('/apps/rss', asyncWrapper(appController.appsAppleRss));

/* PATCH request to batch update multiple Apps */
router.patch('/apps', asyncWrapper(appController.appUpdateBatch));

/* GET request for getting app metadata (for testing - add to test suite?) */
router.get('/app/itunes/:id', asyncWrapper(appController.appGetMetadataById));

/* //////////////////             CATEGORIES             ////////////////// */

/* GET request for one Category */
router.get('/category/:id', asyncWrapper(categoryController.categoryDetail));

/* POST request for creating a Category */
router.post('/category/create', asyncWrapper(categoryController.categoryCreate));

/* GET request for syncing all Categories from iTunes using RSS */
router.get('/categories/sync', asyncWrapper(categoryController.categoriesSync));

/* GET request for syncing all Categories from iTunes using scraper */
router.get('/categories/sync/scrape', asyncWrapper(categoryController.categoriesSyncScrape));

/* //////////////////             DEVELOPERS             ////////////////// */

/* GET request for one Developer */
router.get('/developer/:id', asyncWrapper(developerController.developerDetail));

module.exports = router;
