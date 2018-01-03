const router = require('express').Router();

const asyncWrapper = require('../../helpers/asyncWrapper');
const userController = require('../../controllers/user');

/* GET request for one User */
router.get('/:id', asyncWrapper(userController.GetUser));

/* POST request to create a User */
router.post('/', asyncWrapper(userController.CreateUser));

// /* PUT request to update a User */
// router.put('/:id', asyncWrapper(userController.UpdateUser));

module.exports = router;
