const router = require('express').Router();
const userController = require('./user.controller');
const { userIdValidation, userRequestValidation } = require('./user.validator');

/**
 * @api {get} /users Get all users
 *
 * @apiSuccess (200) {Array<User>}
 */
router.get('/', userController.indexAction);

/**
 * @api {get} /users/:id Get specific user by Id
 *
 * @apiParam {String} [id] Id
 *
 * @apiSuccess (200) {Object<User>}
 */
router.get('/:id', userIdValidation, userController.getByIdAction);

/**
 * @api {put} /users/:id Update specific user by Id
 *
 * @apiParam {String} [id] Id
 * @apiParam {String} [name] Name
 * @apiParam {String} [login] Login
 * @apiParam {String} [password] Password
 *
 * @apiSuccess (200) {Object<User>}
 */
router.put(
  '/:id',
  [...userIdValidation, ...userRequestValidation],
  userController.updateAction
);

/**
 * @api {delete} /users/:id Delete specific user by Id
 *
 * @apiParam {String} [id] Id
 *
 * @apiSuccess (200) {Object<User>}
 */
router.delete('/:id', userIdValidation, userController.deleteAction);

/**
 * @api {post} /users Create user
 *
 * @apiParam {String} [id] Id
 * @apiParam {String} [name] Name
 * @apiParam {String} [login] Login
 * @apiParam {String} [password] Password
 *
 * @apiSuccess (200) {Object<User>}
 */
router.post('/', userRequestValidation, userController.createAction);

module.exports = router;
