const nodemailer = require("nodemailer");

const sendMail = (email, name) => {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "parth23p@gmail.com",
      pass: "meet9patel@gmail.com@@@@",
    },
  });

  let sender = "Parth Patel";
  let mailDetails = {
    from: sender,
    to: email,
    subject: `User signed up successfully with email : ${email}`,
    html: `<h1><b><u><i>WELCOME ${name}</i></u><b></h1>`,
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs");
    } else {
      console.log("Email sent successfully");
    }
  });
};
// module.exports = sendMail;
