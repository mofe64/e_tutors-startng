const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statuscode, res) => {
  const token = signToken(user._id);
  //send token via cookies
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: false,
    httpOnly: true,
  };
  //if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);
  user.password = undefined;

  res.status(statuscode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  //prevent people from signing up as admin by setting the admin value back to the default of student
  let userRole;
  if (req.body.role === 'admin') {
    userRole = 'student';
  } else {
    userRole = req.body.role;
  }
  const newUser = await User.create({
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.password,
    passwordconfirm: req.body.passwordconfirm,
    role: userRole,
  });
  //hasing of password is done using a pre-save middleware in userModel
  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  //get email and password
  const { email, password } = req.body;

  //check if email and password are provide
  if (!email || !password) {
    return next(new AppError('Please provide your email and password', 400));
  }

  //find user based on given email and password
  const user = await User.findOne({ email }).select('+ password');

  //check if user exists and if the password given matches the password in db using an instance method (instnce method located in userModel)
  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError('incorrect email or password', 401));
  }

  //create and sent token
  createSendToken(user, 200, res);
});

exports.authenticate = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError('You are not logged in, log in to gain access', 401)
    );
  }

  //verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //check is user on token still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('User on this token no longer exists', 401));
  }

  //grant access
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};
