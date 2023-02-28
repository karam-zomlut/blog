import nodemailer from 'nodemailer';
import { config } from 'dotenv';

config();

const { EMAIL, EMAIL_PASSWORD } = process.env;

const sendEmail = async (to: string, subject: string, message: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: `${EMAIL}`,
      pass: `${EMAIL_PASSWORD}`,
    },
  });

  const mailOptions = {
    from: 'Karam Thoughts',
    to,
    subject,
    html: message,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
