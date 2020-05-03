const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.route('/').get(categoryController.getAllCategories);
router.route('/newcategory').post(categoryController.createCategory);
router
  .route('/:id')
  .get(categoryController.getSingleCategory)
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;
