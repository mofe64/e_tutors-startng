const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const subjectController = require('../controllers/subjectController');
const router = express.Router();

router.post('/student/signup', authController.studentSignup);
router.post('/tutor/signup', authController.tutorSignup);
router.post('/login', authController.login);
router.get('/all', userController.getUsers);
router.get('/all/tutors', userController.getAllTutors);

//for admins
router
  .route('/tutors/:id')
  .get(userController.getTutor)
  .patch(userController.updateTutor)
  .delete(userController.deactivateTutor);

// for tutors
router.route('/tutors/:tutorid/subjects').get(subjectController.getMySubjects);
router
  .route('/tutors/:tutorid/subjects/:subjectid')
  .patch(subjectController.updateMySubjects)
  .delete(subjectController.deleteMySubject);

//for students
router
  .route('/tutors/subjects/:subjectid')
  .get(subjectController.getSingleSubject);
module.exports = router;
