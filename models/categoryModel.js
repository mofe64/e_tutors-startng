const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  category: {
    type: String,
    required: [true, 'Please enter name of category'],
    unique: [true, 'A category with this name already exists'],
  },
  subjects: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Subject',
    },
  ],
});

//categorySchema.virtual('subjects', {
//  ref: 'Subject',
//  foreignField: 'category',
//  localField: '_id',
//});
//categorySchema.pre(/^find/, function (next) {
//  this.populate({
//    path: 'subjects',
//    select: '-_id -tutors -category -__v',
//  });
//  next();
//});

//categorySchema.pre('deleteOne', function (next) {
//  console.log('del');
//  this.model('Subject').deleteOne({ Category: this._id }, next);
//});
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
