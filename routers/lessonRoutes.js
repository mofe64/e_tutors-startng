const express = require('express');
const lessonController = require('../controllers/lessonController');

const router = express.Router();

router.route('/addlesson').post(lessonController.createLesson);
router.route('/').get(lessonController.getAllLessons);

router
  .route('/:id')
  .get(lessonController.getLesson)
  .patch(lessonController.updateLesson)
  .delete(lessonController.deleteLesson);

module.exports = router;
