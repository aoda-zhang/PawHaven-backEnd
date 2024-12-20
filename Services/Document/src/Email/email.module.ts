import { Module } from '@nestjs/common'

import { MailerModule } from '@nestjs-modules/mailer'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { EmailController } from './email.controller'
import { EmailService } from './email.service'

@Module({
    imports: [
        // MongooseModule.forFeature([{ name: DBCollection.HISTORY, schema: HistorySchema }]),
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configs: ConfigService) => ({
                transport: {
                    host: configs.get('email')?.host ?? '',
                    secure: true,
                    auth: {
                        user: configs.get('email')?.user ?? '',
                        pass: configs.get('email')?.pwd ?? ''
                    }
                }
            }),
            inject: [ConfigService]
        })
    ],
    controllers: [EmailController],
    providers: [EmailService],
    exports: [EmailService]
})
export default class EmailModule {}
