const router = require('express').Router();

const asyncWrapper = require('../../helpers/asyncWrapper');
const userController = require('../../controllers/user');
const trackerController = require('../../controllers/tracker');

/* GET request for one User */
router.get('/:id', asyncWrapper(userController.GetUser));

/* POST request to create a User */
router.post('/', asyncWrapper(userController.CreateUser));

// /* PUT request to update a User */
// router.put('/:id', asyncWrapper(userController.UpdateUser));

/*
 * TODO: re-examine the organization of the below routes... I would like to not have to
 * state /trackers. Also, the only reason this is necessary is so I can pull req.params.id
 * This will get reworked with security - using an authentication middleware, I can
 * append the user object to the request (OR just check the JWT) and then can call
 * req.user._id in the tracker route to find trackers with that ID
 */

/* GET request for all Trackers TODO: implement default limit, use pagination */
/*
 * use pagination and query params for filter: https://cloud.google.com/apis/design/standard_methods#list
 * this is technically retrieving someone's wishlist
*/
router.get('/:id/trackers', asyncWrapper(trackerController.ListTrackers));

/* GET request for one Tracker */
router.get('/:id/trackers/:id', asyncWrapper(trackerController.GetTracker));

/* POST request to create a Tracker */
router.post('/:id/trackers', asyncWrapper(trackerController.CreateTracker));

// /* PUT request to update a Tracker */
// router.put('/:id', asyncWrapper(trackerController.UpdateTracker));

module.exports = router;
