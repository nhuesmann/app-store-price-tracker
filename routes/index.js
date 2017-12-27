const router = require('express').Router();

router.use('/apps', require('./apps'));
router.use('/categories', require('./categories'));
router.use('/developers', require('./developers'));
router.use('/services', require('./services'));

module.exports = router;
