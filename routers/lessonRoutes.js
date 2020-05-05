const express = require('express');
const lessonController = require('../controllers/lessonController');
const authController = require('../controllers/authController');

const router = express.Router();
router.use(authController.authenticate);
router
  .route('/addlesson')
  .post(authController.restrictTo('admin'), lessonController.createLesson); //create lesson
router
  .route('/')
  .get(authController.restrictTo('admin'), lessonController.getAllLessons); //get all lessons

router
  .route('/:id')
  .get(authController.restrictTo('admin'), lessonController.getLesson) //get a lesson
  .patch(authController.restrictTo('admin'), lessonController.updateLesson) //update lesson
  .delete(authController.restrictTo('admin'), lessonController.deleteLesson); // delete lesson

module.exports = router;
