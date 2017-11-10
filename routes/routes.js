var express = require('express');
var router = express.Router();
var asyncWrapper = require('../middlewares/asyncWrapper');

// Require controller modules
var appController = require('../controllers/appController');
var categoryController = require('../controllers/categoryController');

/* POST request for creating an App */
router.post('/app/create', asyncWrapper(appController.appCreateOne));

/* GET request for one App */
router.get('/app/:id', asyncWrapper(appController.appDetail));

/* PUT request to update an App */
router.put('/app/:id', appController.appUpdate);

/* DELETE request to delete an App */
router.delete('/app/:id', appController.appDelete);

/* GET request for all App TODO: decide how to limit this... can't reply with all */
router.get('/apps', appController.appsList);

/* GET request for new Apps from iTunes RSS feed */
router.get('/apps/new', asyncWrapper(appController.appsNew));

/* GET request for top paid Apps from iTunes RSS feed */
router.get('/apps/top/paid', asyncWrapper(appController.appsTopPaid));

/* POST request to create multiple Apps */
router.post('/apps', asyncWrapper(appController.appCreateBatch));

/* PATCH request to batch update multiple Apps */
router.patch('/apps', asyncWrapper(appController.appUpdateBatch));

/* GET request for getting app metadata (for testing - add to test suite?) */
router.get('/app/itunes/:id', asyncWrapper(appController.appGetMetadataById));

/* POST request for creating a Category */
router.post('/category/create', asyncWrapper(categoryController.categoryCreate));

/* GET request for syncing all Categories from iTunes */
router.get('/categories/sync', asyncWrapper(categoryController.categoriesSync));

module.exports = router;
