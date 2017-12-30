const router = require('express').Router();

// TODO: implement middleware here. should validate the requests
// OR, does this need to be in the individual resource's router?
// e.g. a middleware that ensures the objectid is valid (for a get/:id request)

router.use('/apps', require('./apps'));
router.use('/categories', require('./categories'));
router.use('/developers', require('./developers'));
router.use('/services', require('./services'));

module.exports = router;
