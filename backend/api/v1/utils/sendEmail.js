const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // Specify the email service provider (e.g., Gmail)
  auth: {
    user: process.env.EMAIL, // Your email address
    pass: process.env.EMAIL_APP_PASSWORD, // Your email password
  },
});

const sendEmail = async (mailOptions) => {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
