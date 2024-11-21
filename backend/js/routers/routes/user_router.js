const Router = require('express')
const router = new Router()
const path = require('path')
const user_controller = require(path.join(__dirname, '..', 'controllers', 'user_controller'))

router.get('/news/:id', user_controller.renderUserNews);
router.get('/get_info_user/:id', user_controller.renderUserJSON);
router.get('/friends/', user_controller.getUserFriendsByEmailPaswd);
router.get('/friends/:id', user_controller.renderUserFriends);
router.get('/get_name/:id', user_controller.renderUserName);
router.put('/delete_friend/', user_controller.deleteFriendUser);
router.put('/change_params/', user_controller.changeParams);

module.exports = router;