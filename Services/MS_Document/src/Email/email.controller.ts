import { Body, Controller, Post, Req } from '@nestjs/common'
import { EmailService } from './email.service'
import { EmailPayload } from './types'

@Controller('email')
export class EmailController {
    constructor(private readonly emailService: EmailService) {}

    @Post('/send')
    sendEmail(@Req() req, @Body() emailInfo: EmailPayload) {
        const userID = req?.user?.userID
        return this.emailService.sendMail(userID, emailInfo)
    }
}
