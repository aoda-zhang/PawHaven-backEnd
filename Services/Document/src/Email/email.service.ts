import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { render } from '@react-email/components'
import { EmailPayload } from './types'

@Injectable()
export class EmailService {
    constructor(
        private readonly mailService: MailerService,
        private readonly configs: ConfigService
    ) {}
    async sendMail(_userID: string, emailProps: EmailPayload) {
        // 查出此人，并且保存到邮件发送的记录
        const { default: EmailTemplate } = await import(
            `./templates/${emailProps?.templateName}.tsx`
        )
        const emailHtml = await render(EmailTemplate(emailProps))
        const options: ISendMailOptions = {
            ...(emailProps ?? {}),
            from: this.configs.get('email')?.from,
            html: emailHtml
        }
        await this.mailService.sendMail(options)
    }
}
