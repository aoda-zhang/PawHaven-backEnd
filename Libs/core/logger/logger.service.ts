import { Global, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import type { Model } from 'mongoose'

import { DBCollection } from '@shared/schemas/DBcollection'

import type { LoggerDoc } from './logger.schema'

@Injectable()
@Global()
export class LoggerService {
    private logger

    constructor(@InjectModel(DBCollection.LOGS) private logModel: Model<LoggerDoc>) {}

    error(message: string, error: Error, meta?: any) {
        this.logger.error(message, { error, ...meta })
    }

    warn(message: string, meta?: any) {
        this.logger.warn(message, meta)
    }
}
