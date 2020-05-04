const express = require('express');
const subjectController = require('../controllers/subjectController');
const categoryController = require('../controllers/categoryController');

const router = express.Router({ mergeParams: true });

router.route('/').get(subjectController.getSubjects);
router.route('/newsubject').post(subjectController.createSubject);
router
  .route('/:id')
  .get(subjectController.getSingleSubject)
  .patch(subjectController.updateSubject)
  .delete(subjectController.deleteSubject);

router
  .route('/:id/addtutor/:tutorid')
  .patch(subjectController.registerForSubject);
//router.route('/:categoryid/subject').post(subjectController.createSubject);

module.exports = router;
