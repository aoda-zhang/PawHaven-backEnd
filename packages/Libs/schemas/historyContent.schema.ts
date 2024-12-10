import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { DBCollection } from './DBcollection'
import CommonSchema from './common.schema'

@Schema({ collection: DBCollection.HISTORY })
export class HistoryContent extends CommonSchema {
    @Prop({
        required: true
    })
    startTime: string

    @Prop({
        required: true
    })
    from: string

    @Prop({
        required: true
    })
    to: string

    @Prop({
        required: true
    })
    spendTime: string

    @Prop({
        required: true
    })
    allMileage: string
}
export const HistoryContentSchema = SchemaFactory.createForClass(HistoryContent)
