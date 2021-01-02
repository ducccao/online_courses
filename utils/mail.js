const nodemailer = require("nodemailer");

// let testAccount = await nodemailer.createTestAccount();
const user = "caovanducf20ss@gmail.com";
const pass = "waoauswbnglcavbp";
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: user,
    pass: pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = {
  sendOTP: (email, otp) => {
    const mailOptions = {
      from: `Online Courses - TEAM 7 ${user}`,
      to: `${email}`,
      subject: "Verify your email!",
      text: `Please Click the link to verify you email: ${otp}`,
    };
    transporter.sendMail(mailOptions, (er, info) => {
      if (er) {
        console.log(er);
      } else {
        console.log(info);
      }
    });
  },
};
