const nodemailer = require("nodemailer");

const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const mailDetails = (email, userId, resetToken) => {
  const resetPasswordUrl = `http://localhost:4000/api/v1/resetPassword?userId=${userId}&resetToken=${resetToken}`;
  const mailDetails = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Reset your password",
    html: `<h1>Reset your password</h1><p>Click <a href="${resetPasswordUrl}">here</a> to reset your password</p><br><p>It will be valid for 10 minutes only</p>`,
  };
  return mailDetails;
};

exports.sendMail = async (email, userId, resetToken) => {
  let mailOptions = mailDetails(email, userId, resetToken);
  return await mailTransporter.sendMail(mailOptions);
};
