const express = require('express');
const categoryController = require('../controllers/categoryController');
const subjectRouter = require('./subjectRoutes');
const subjectController = require('../controllers/subjectController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.authenticate);
router.route('/').get(categoryController.getAllCategories);
router
  .route('/newcategory')
  .post(authController.restrictTo('admin'), categoryController.createCategory);
router
  .route('/:id')
  .get(categoryController.getSingleCategory)
  .patch(authController.restrictTo('admin'), categoryController.updateCategory) //update category
  .delete(
    authController.restrictTo('admin'),
    categoryController.deleteCategory
  ); //delete category

router
  .route('/:categoryid/subject')
  .post(authController.restrictTo('admin'), subjectController.createSubject); //add a subject to a category
router.route('/:categoryid/subject').get(subjectController.getSubjects); //get all subjects in a category
router
  .route('/:categoryid/subject/:subjectid')
  .get(subjectController.getSingleSubject) //get a subject in a category
  .patch(authController.restrictTo('admin'), subjectController.updateSubject) //update a subject in a category
  .delete(authController.restrictTo('admin'), subjectController.deleteSubject); //delete a subject in a category

//router.route('/:categoryid/subject/:subjectid').get().patch().delete();
module.exports = router;
