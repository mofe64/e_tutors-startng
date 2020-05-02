const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, 'Please tell us your full name'],
  },
  email: {
    type: String,
    required: [true, 'Please Provide an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  role: {
    type: String,
    required: [
      true,
      'please specify if you are registering as a studnet or tutor',
    ],
    enum: ['student', 'tutor', 'admin'],
  },
  password: {
    type: String,
    required: [true, 'Kindly enter your password'],
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
});

const User = mongoose.model('User', userSchema);
module.exports = User;
