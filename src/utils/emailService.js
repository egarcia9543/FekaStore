/* eslint-disable no-undef */
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "egarcia9543@misena.edu.co",
    pass: `${process.env.GPASS}`,
  },
});

exports.sendEmail = async (email, subject, text) => {
  const mailOptions = {
    from: "egarcia9543@misena.edu.co",
    to: email,
    subject: subject,
    text: text,
  };

  await transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Correo enviado "+ info.response);
    }
  });
};

