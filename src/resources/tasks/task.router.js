const router = require('express').Router();
const taskController = require('./task.controller');
const { taskIdValidation, taskValidation } = require('./task.validator');

router.get('/', taskController.indexAction);

router.get('/:id', taskIdValidation, taskController.getByIdAction);

router.put(
  '/:id',
  [...taskIdValidation, ...taskValidation],
  taskController.updateAction
);

router.delete('/:id', taskIdValidation, taskController.deleteAction);

router.post('/', [...taskValidation], taskController.createAction);

module.exports = router;
