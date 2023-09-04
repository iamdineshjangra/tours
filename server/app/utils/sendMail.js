const nodemailer = require("nodemailer");

const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const mailDetails = (email, resetToken) => {
  const mailDetails = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Reset your password",
    html: `<h1>Reset your password</h1><p>Click <a href="http://localhost:4100/resetPassword/${resetToken}">here</a> to reset your password</p>`,
  };
  return mailDetails;
};

exports.sendMail = async (email, resetToken) => {
  let mailOptions = mailDetails(email, resetToken);
  return await mailTransporter.sendMail(mailOptions);
};
