import { SentMessageInfo } from 'nodemailer'
import Mail = require('nodemailer/lib/mailer')

const nodemailer = require('nodemailer')

export class MailerService {
    async sendMail(mailOptions: Mail.Options): Promise<SentMessageInfo> {
        const transporter = nodemailer.createTransport({
            type: 'SMTP',
            host: 'smtp.gmail.com',
            secure: true,
            port: 465,
            auth: {
                user: process.env.CONTACT_EMAIL,
                pass: process.env.CONTACT_EMAIL_PASSWORD
            }
        })
        return transporter.sendMail({ ...mailOptions, to: process.env.CONTACT_EMAIL })
    }
}
