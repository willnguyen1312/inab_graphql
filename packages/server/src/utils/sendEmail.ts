import { logError, logInfo } from '@inab/common';
import * as nodemailer from 'nodemailer';

export const sendEmail = async (recipient: string, url: string, linkText: string) => {
  nodemailer.createTestAccount((err, account) => {
    if (err) {
      logError(err);
    }
    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const message = {
      from: 'Sender Name <sender@example.com>',
      to: `Recipient <${recipient}>`,
      subject: 'Nodemailer is unicode friendly ✔',
      text: 'Hi there!',
      html: `<html>
        <body>
        <p>Testing Nodemailer - the world's most awesomest email package!</p>
        <a href="${url}">${linkText}</a>
        </body>
        </html>`,
    };

    transporter.sendMail(message, (err1, info) => {
      if (err1) {
        logError('Error occurred. ' + err1.message);
      }

      logInfo('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      logInfo('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  });
};
