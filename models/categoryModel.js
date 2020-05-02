const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  category: {
    type: String,
    required: [true, 'Please enter name of category'],
  },
  subjects: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Subject',
    },
  ],
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
