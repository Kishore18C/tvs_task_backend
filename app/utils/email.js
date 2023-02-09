import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export default function sendEmail(email, otp) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    service: "gmail",
    secure: true,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: email,
    subject: "Otp verification",
    text: `Your one time password to verify your Email account is ${otp}.`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return console.log("Email error", error);
    } else {
      return console.log(`Email sent to ${email} `);
    }
  });
}
