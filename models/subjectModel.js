const mongoose = require('mongoose');

const subjectSchema = mongoose.Schema({
  subject: {
    type: String,
    required: [true, 'Please enter subject name'],
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
  },

  tutors: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Tutor',
    },
  ],
});

//subjectSchema.pre(/^find/, function (next) {
//  this.populate({
//    path: 'category',
//    select: 'category',
//  });
//  next();
//});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
