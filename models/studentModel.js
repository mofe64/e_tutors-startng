const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const studentSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Please tell us your first name'],
  },
  lastname: {
    type: String,
    required: [true, 'Please tell us your last name'],
  },
  email: {
    type: String,
    required: [true, 'Please Provide an email'],
    unique: [true, 'This email is already taken, please try another'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  role: {
    type: String,
    default: 'student',
  },
  password: {
    type: String,
    required: [true, 'Kindly enter your password'],
    select: false,
  },
  passwordconfirm: {
    type: String,
    required: [true, 'kindly confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'passwords are not the same',
    },
  },
  lessons: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Lesson',
    },
  ],
});

studentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'lessons',
    select: ' -students -tutors -_id -__v',
  });
  next();
});
//pre-save middleware to hash password
studentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordconfirm = undefined;
  next();
});

//instance method to check given password against encrypted passwordin db when logging in
studentSchema.methods.checkPassword = async function (
  inputPassword,
  userPassword
) {
  return await bcrypt.compare(inputPassword, userPassword);
};

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
