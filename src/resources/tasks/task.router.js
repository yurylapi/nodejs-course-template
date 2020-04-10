const router = require('express').Router({ mergeParams: true });
const taskController = require('./task.controller');
const {
  taskIdValidation,
  taskValidation,
  boardIdValidation
} = require('./task.validator');

router.get('/', taskController.indexAction);

router.get(
  '/:id',
  [...boardIdValidation, ...taskIdValidation],
  taskController.getByIdAction
);

router.put(
  '/:id',
  [...boardIdValidation, ...taskIdValidation, ...taskValidation],
  taskController.updateAction
);

router.delete(
  '/:id',
  [...boardIdValidation, ...taskIdValidation],
  taskController.deleteAction
);

router.post(
  '/',
  [...boardIdValidation, ...taskValidation],
  taskController.createAction
);

module.exports = router;
