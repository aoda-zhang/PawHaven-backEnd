import { Body, Controller, Logger, Post, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import type { EmailService } from './email.service'
import type { EmailPayload } from './types'

@ApiTags('email module')
@Controller('email')
export class EmailController {
    // logger: Logger = new Logger(HistoryController.name, { timestamp: true })

    constructor(private readonly emailService: EmailService) {}

    @Post('/send')
    sendEmail(@Req() req, @Body() emailInfo: EmailPayload) {
        const userID = req?.user?.userID
        return this.emailService.sendMail(userID, emailInfo)
    }
}
