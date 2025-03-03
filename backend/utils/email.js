const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  //Create a transport
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASS,
    },
  });
  //Define the email options
  const mailOptions = {
    from: "Tejas Khera <tejastaskfyer24@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  //Send email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
