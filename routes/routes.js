var express = require('express');
var router = express.Router();

// Require controller modules
var appController = require('../controllers/appController');

/* POST request for creating an App */
router.post('/app/create', appController.appCreate);

/* GET request for one App */
router.get('/app/:id', appController.appDetail);

/* PUT request to update an App */
router.put('/app/:id', appController.appUpdate);

/* DELETE request to delete an App */
router.delete('/app/:id', appController.appDelete);

/* GET request for all App TODO: decide how to limit this... can't reply with all */
router.get('/apps', appController.appList);

module.exports = router;
