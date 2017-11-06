var express = require('express');
var router = express.Router();
var asyncWrapper = require('../utils/asyncWrapper');

// Require controller modules
var appController = require('../controllers/appController');
var categoryController = require('../controllers/categoryController');

/* POST request for creating an App */
router.post('/app/create', asyncWrapper(appController.appCreate));

/* GET request for one App */
router.get('/app/:id', asyncWrapper(appController.appDetail));

/* PUT request to update an App */
router.put('/app/:id', appController.appUpdate);

/* DELETE request to delete an App */
router.delete('/app/:id', appController.appDelete);

/* GET request for all App TODO: decide how to limit this... can't reply with all */
router.get('/apps', appController.appList);

/* POST request for creating ids (from scraper) */

// router.post('/scraper/ids', scraperController.)

/* POST request for creating a Category */
router.post('/category/create', asyncWrapper(categoryController.categoryCreate));

module.exports = router;
