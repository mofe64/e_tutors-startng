const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Schema.ObjectId,
    ref: 'Subject',
  },
  tutors: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Tutor',
    },
  ],
  students: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Tutor',
    },
  ],
  lessonname: {
    type: String,
    require: [true, 'Please enter the lesson name'],
  },
});

lessonSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'subject',
    select: ' -_id -tutors -category -__v',
  });
  next();
});

lessonSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'tutors',
    select: ' -_id -subjects -role -email -__v -id',
  });
  next();
});

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;
