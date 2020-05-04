const express = require('express');
const categoryController = require('../controllers/categoryController');
const subjectRouter = require('./subjectRoutes');
const subjectController = require('../controllers/subjectController');

const router = express.Router();

router.route('/').get(categoryController.getAllCategories);
router.route('/newcategory').post(categoryController.createCategory);
router
  .route('/:id')
  .get(categoryController.getSingleCategory)
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

router.route('/:categoryid/subject').post(subjectController.createSubject);
router.route('/:categoryid/subject').get(subjectController.getSubjects);
router
  .route('/:categoryid/subject/:subjectid')
  .get(subjectController.getSingleSubject)
  .patch(subjectController.updateSubject)
  .delete(subjectController.deleteSubject);

//router.route('/:categoryid/subject/:subjectid').get().patch().delete();
module.exports = router;
