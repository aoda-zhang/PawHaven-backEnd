import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { type HistoryContent, HistoryContentSchema } from './historyContent.schema'
import CommonSchema from '@shared/models/common.schema'
import GatewayDBCollections from './gateway.DBcollection'

@Schema({ collection: GatewayDBCollections.HISTORY, timestamps: true })
export class History extends CommonSchema {
    // 关联用户姓名和id
    @Prop({
        required: true
    })
    userName: string

    @Prop({
        required: false
    })
    userID?: string

    @Prop({
        required: true
    })
    spendDate: string

    // 依赖另一个数据模型
    @Prop({
        required: true,
        type: [HistoryContentSchema]
    })
    mapInfo: HistoryContent[]
}
export const HistorySchema = SchemaFactory.createForClass(History)
