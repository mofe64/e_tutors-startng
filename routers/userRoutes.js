const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/student/signup', authController.studentSignup);
router.post('/tutor/signup', authController.tutorSignup);
router.post('/login', authController.login);
router.get('/all', userController.getUsers);
router.get('/all/tutors', userController.getAllTutors);
router
  .route('/tutors/:id')
  .get(userController.getTutor)
  .patch(userController.updateTutor)
  .delete(userController.deactivateTutor);
module.exports = router;
