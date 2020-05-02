const express = require('express');
const subjectController = require('../controllers/subjectController');

const router = express.Router();

router.route('/').get(subjectController.getSubjects);
router.route('/newsubject').post(subjectController.createSubject);
router
  .route('/:id')
  .get(subjectController.getSingleSubject)
  .patch(subjectController.updateSubject)
  .delete(subjectController.deleteSubject);

module.exports = router;
