const router = require('express').Router();

const asyncWrapper = require('../../helpers/asyncWrapper');
const appController = require('../../controllers/app');

/* GET request for all App TODO: implement default limit, use pagination */
/* use pagination and query params for filter: https://cloud.google.com/apis/design/standard_methods#list  */
router.get('/', asyncWrapper(appController.ListApps));

// /* GET request for new Apps from iTunes RSS feed */
// router.get('/getNew', asyncWrapper(appController.appsNew));

/* GET request for one App */
router.get('/:id', asyncWrapper(appController.GetApp));

/* POST request for creating an App */
router.post('/', asyncWrapper(appController.CreateApp));

// /* POST request for creating multiple Apps */
// router.post('/batchCreate', asyncWrapper(appController.batchCreate));

/* PUT request to update an App */
router.put('/:id', asyncWrapper(appController.UpdateApp));

/* DELETE request to delete an App */
router.delete('/:id', asyncWrapper(appController.DeleteApp));

/* //////////////////               TESTING                ////////////////// */

// TODO: deprecate functions below, move to services

/* GET request for any curated iTunes RSS feed */
router.get('/rss', asyncWrapper(appController.appsAppleRss));

/* PATCH request to batch update multiple Apps */
router.patch('/', asyncWrapper(appController.appUpdateBatch));

/* GET request for getting app metadata (for testing - add to test suite?) */
router.get('/itunes/:id', asyncWrapper(appController.appGetMetadataById));

module.exports = router;
