const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gabipernas88@gmail.com",
    pass: "yrnr mjzo hknq bvlh",
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: "gabipernas88@gmail.com",
      to: to,
      subject: subject,
      html: html,
    };
    await transporter.sendMail(mailOptions);
    console.log("se ha enviado correctamente");
  } catch (error) {
    console.log("No se ha enviado el correo", error);
  }
};

module.exports = { sendEmail };
