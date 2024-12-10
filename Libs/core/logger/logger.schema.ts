import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import type { Document } from 'mongoose'

import { DBCollection } from '@shared/schemas/DBcollection'
import CommonSchema from '@shared/schemas/common.schema'
import { EnvConstant } from 'config'

@Schema({ collection: DBCollection.LOGS })
export class Loggers extends CommonSchema {
    @Prop({
        required: true,
        enum: EnvConstant
    })
    currentEnv: EnvConstant

    @Prop({
        required: true
    })
    message: string

    @Prop({
        required: true
    })
    timestamp: string

    @Prop({
        required: true
    })
    requestURL: string

    @Prop({
        required: true
    })
    method: string

    @Prop({
        required: true,
        type: Object
    })
    requestHeaders: object

    @Prop({
        required: true
    })
    responseStatus: number
}
export type LoggerDoc = Loggers & Document
export const LoggerSchema = SchemaFactory.createForClass(Loggers)
