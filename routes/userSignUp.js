const HttpError = require("../models/http-error");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
// var mail = require("./mailSender")();

const nodemailer = require("nodemailer");

const sendMail = (email, name) => {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "pcubepatel@gmail.com",
      pass: "Bspcnp2011418@",
    },
  });

  let sender = "Parth Patel";
  let mailDetails = {
    from: sender,
    to: email,
    subject: `User signed up successfully with email : ${email}`,
    text: `WELCOME ${name}!!`,
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs", err);
    } else {
      console.log("Email sent successfully");
    }
  });
};
//

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing Up failed! Please try again later.",
      500
    );
    // return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User existing already! Please login instead.",
      422
    );
    // return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError("Couln't create user , please try again", 500);
    // return next(error);
  }
  // hash .bcrypt also return a promise so we would have to await
  // 12 is no .of salting rounds

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await createdUser.save();
    sendMail(email, name);
    console.log("user created successfully!!");
    return res.status(201).json({
      success: true,
      message: "user created successfully!!",
      data: createdUser,
    });
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    // return next(error);
  }
};
module.exports = signup;
