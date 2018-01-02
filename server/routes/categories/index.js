const router = require('express').Router();

const asyncWrapper = require('../../helpers/asyncWrapper');
const categoryController = require('../../controllers/categoryController');

/* GET request for all Categories TODO: decide how to limit this... can't reply with all */
/* use pagination and query params for filter: https://cloud.google.com/apis/design/standard_methods#list  */
// router.get('/categories', asyncWrapper(categoryController.ListCategories));

// /* GET request for syncing all Categories from iTunes using RSS */
// router.get('/sync', asyncWrapper(categoryController.sync));

// /* GET request for syncing all Categories from iTunes using scraper */
// router.get('/syncScrape', asyncWrapper(categoryController.syncScrape));

/* GET request for one Category */
router.get('/:id', asyncWrapper(categoryController.GetCategory));

/* POST request for creating a Category */
// router.post('/', asyncWrapper(categoryController.CreateCategory));

module.exports = router;
