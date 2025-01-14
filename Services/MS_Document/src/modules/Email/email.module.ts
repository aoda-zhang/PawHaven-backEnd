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
                    port: configs.get('email')?.port ?? '',
                    secureConnection: false,
                    auth: {
                        user: configs.get('email')?.user ?? '',
                        pass: configs.get('email')?.password ?? ''
                    },
                    tls: {
                        ciphers: configs.get('email')?.tls?.ciphers ?? ''
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
