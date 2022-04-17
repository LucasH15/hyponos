import { inject } from '@loopback/core'
import { post, requestBody } from '@loopback/rest'

import { MailerService } from '../services'
import { MAILER_SERVICE } from '../utils/keys'
import { ContactRequestBody } from './specs/contact.specs'
import { reclamation, bugReport, roomInfo, addService } from '../constants'

interface IContactForm {
    firstName: string
    lastName: string
    email: string
    subject: string
    message: string
}

export class ContactController {
    constructor(
        @inject(MAILER_SERVICE)
        public mailerService: MailerService
    ) {}

    @post('/contact')
    async send(
        @requestBody(ContactRequestBody)
        form: IContactForm
    ): Promise<void> {
        let subject = ''

        switch (form.subject) {
            case 'reclamation':
                subject = reclamation
                break
            case 'bugReport':
                subject = bugReport
                break
            case 'roomInfo':
                subject = roomInfo
                break
            case 'addService':
                subject = addService
                break
        }

        await this.mailerService.sendMail({
            from: form.email,
            subject: subject,
            html: `
                <p>Prénom: ${form.firstName}</p>
                <p>Nom: ${form.lastName}</p>
                <p>Email: ${form.email}</p>
                <p>Sujet: ${form.subject}</p>
                <p>Message: ${form.message}</p>
            `
        })
    }
}
