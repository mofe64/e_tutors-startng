const express = require('express');
const subjectController = require('../controllers/subjectController');
const categoryController = require('../controllers/categoryController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.authenticate);
router.route('/').get(subjectController.getSubjects);
router.route('/newsubject').post(subjectController.createSubject);
router
  .route('/:id')
  .get(subjectController.getSingleSubject)
  .patch(subjectController.updateSubject)
  .delete(subjectController.deleteSubject);

router
  .route('/:id/addtutor/:tutorid')
  .patch(
    authController.restrictTo('tutor'),
    subjectController.registerForSubject
  );
//router.route('/:categoryid/subject').post(subjectController.createSubject);

module.exports = router;
