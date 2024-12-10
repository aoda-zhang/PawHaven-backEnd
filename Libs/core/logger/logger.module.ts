import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { LoggerModule } from 'nestjs-pino'

import { DBCollection } from '@shared/schemas/DBcollection'

import { LoggerSchema } from './logger.schema'
import { LoggerService } from './logger.service'

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: DBCollection.LOGS,
                schema: LoggerSchema
            }
        ]),
        LoggerModule.forRoot({
            pinoHttp: {
                transport: {
                    target: 'pino-pretty',
                    options: {
                        singleLine: true
                    }
                }
            }
        })
    ],
    providers: [LoggerService],
    exports: [LoggerService]
})
export default class LoggersModule {}
