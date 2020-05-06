const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const subjectController = require('../controllers/subjectController');
const router = express.Router();

router.post('/student/signup', authController.studentSignup);
router.post('/tutor/signup', authController.tutorSignup);
router.post('/login', authController.login);
router.route('/admin').post(authController.adminSignup); //route for admin signup not to be exposed to public

router.use(authController.authenticate);
router.get('/all/students', userController.getStudents);
router.get(
  '/all/tutors',
  authController.restrictTo('admin'),
  userController.getAllTutors
); //get all tutors

//for admins
router
  .route('/tutors/:id')
  .get(authController.restrictTo('admin'), userController.getTutor) // get a tutor
  .patch(authController.restrictTo('admin'), userController.updateTutor) //update a tutor
  .delete(authController.restrictTo('admin'), userController.deactivateTutor); //delete(deactivate) a tutor

// for tutors
router
  .route('/tutors/:tutorid/subjects')
  .get(authController.restrictTo('tutor'), subjectController.getMySubjects);
router
  .route('/tutors/:tutorid/subjects/:subjectid')
  .patch(authController.restrictTo('tutor'), subjectController.updateMySubjects)
  .delete(
    authController.restrictTo('tutor'),
    subjectController.deleteMySubject
  );

//for students
router
  .route('/tutors/subjects/:subjectid')
  .get(
    authController.restrictTo('student'),
    subjectController.getSingleSubject
  );
router
  .route('/students/:studentid/booklesson/:lessonid')
  .patch(authController.restrictTo('student'), userController.addLesson);
module.exports = router;
