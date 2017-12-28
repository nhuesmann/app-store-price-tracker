const router = require('express').Router();

const asyncWrapper = require('../../middlewares/asyncWrapper');
const developerController = require('../../controllers/developerController');

/* //////////////////             DEVELOPERS             ////////////////// */

/* GET request for one Developer */
router.get('/:id', asyncWrapper(developerController.GetDeveloper));

/* PUT request to update a Developer */
router.put('/:id', asyncWrapper(developerController.UpdateDeveloper));

module.exports = router;
