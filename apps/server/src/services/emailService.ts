import nodemailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

transporter.verify((error) => {
  if (error) {
    global.console.log(error);
  } else {
    global.console.log('Server is ready to work with email');
  }
});

async function send(
  to: string,
  subject: string,
  html: string,
): Promise<void> {
  transporter.sendMail({
    from: '"ЄДніпро" <sadok.develop@gmail.com>',
    to,
    subject,
    text: '',
    html,
  });
}

async function sendActivationLink(email: string, token: string) {
  const link = `${process.env.CLIENT_URL}/activation/${token}`;

  send(
    email,
    'Активація акаунту на сайті "Дошкільнятко"',
    `<h1>Активація акаунту</h1>
    <a href="${link}">${link}</a>`,
  );
}

export const emailService = {
  send,
  sendActivationLink,
};
