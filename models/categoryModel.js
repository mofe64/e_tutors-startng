const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, 'Please enter name of category'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//categorySchema.virtual('subjects', {
//  ref: 'Subject',
//  foreignField: 'category',
//  localField: '_id',
//});

categorySchema.virtual('subjects', {
  ref: 'Subject',
  foreignField: 'category',
  localField: '_id',
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
