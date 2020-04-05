const router = require('express').Router();
const boardController = require('./board.controller');
const {
  boardIdValidation,
  boardValidation,
  columnValidation
} = require('./board.validator');

router.get('/', boardController.indexAction);

router.get('/:id', boardIdValidation, boardController.getByIdAction);

router.put(
  '/:id',
  [...boardIdValidation, ...boardValidation, ...columnValidation],
  boardController.updateAction
);

router.delete('/:id', boardIdValidation, boardController.deleteAction);

router.post(
  '/',
  [...boardValidation, ...columnValidation],
  boardController.createAction
);

module.exports = router;
