import type { ISendMailOptions } from '@nestjs-modules/mailer'

export interface EmailPayload extends ISendMailOptions {
    templateName: string
}
