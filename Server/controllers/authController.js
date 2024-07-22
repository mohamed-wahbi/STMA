const asyncHandler = require("express-async-handler");
const { User, registerVerify, loginVerify } = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

/*--------------------------------------------------
* @desc    Register new User
* @router  /api/auth/register
* @methode POST
* @access  public
----------------------------------------------------*/
module.exports.registerCtel = asyncHandler(async (req, res) => {
  // Validation
  const { error } = registerVerify(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Is user already exists
  const findUser = await User.findOne({ email: req.body.email });
  if (findUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // New user and save it in DB
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });
  await newUser.save();

  // Send a response to client
  res.status(201).json({ message: 'You registered successfully, please log in' });
});

/*--------------------------------------------------
* @desc    Login new User
* @router  /api/auth/login
* @methode POST
* @access  public
----------------------------------------------------*/
module.exports.loginCtrl = asyncHandler(async (req, res) => {
  // Validation
  const { error } = loginVerify(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Find user by email
  const findEmailUser = await User.findOne({ email: req.body.email });
  if (!findEmailUser) {
    return res.status(400).json({ message: 'Email or password is invalid' });
  }

  // Password compare
  const passwordCompare = await bcrypt.compare(req.body.password, findEmailUser.password);
  if (!passwordCompare) {
    return res.status(400).json({ message: 'Email or password is invalid' });
  }

  //Creation du tok
  const token = jwt.sign(
    { id: findEmailUser._id, isAdmin: findEmailUser.isAdmin , isTechnicien:findEmailUser.isTechnicien },
    'wahbiDevCode',
    { expiresIn: '1h' }
  );

 

  res.status(200).json({
    _id: findEmailUser._id,
    isAdmin: findEmailUser.isAdmin,
    profilePhoto: findEmailUser.profilePhoto,
    token
  });





  
});

