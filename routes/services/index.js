const router = require('express').Router();

const asyncWrapper = require('../../middlewares/asyncWrapper');
const appController = require('../../controllers/appController');
const categoryController = require('../../controllers/categoryController');


/* //////////////////             SERVICES             ////////////////// */

/* GET request for new Apps from iTunes RSS feed */
router.get('/appsGetNew', asyncWrapper(appController.appsNew));

/* POST request for creating multiple Apps */
router.post('/appsBatchCreate', asyncWrapper(appController.batchCreate));

/* GET request for syncing all Categories from iTunes using RSS */
router.get('/categoriesSync', asyncWrapper(categoryController.sync));

/* GET request for syncing all Categories from iTunes using scraper */
router.get('/categoriesSyncScrape', asyncWrapper(categoryController.syncScrape));

module.exports = router;
