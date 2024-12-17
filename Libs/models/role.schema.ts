import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import CommonDBCollections from './common.DBcollection'
import CommonSchema from './common.schema'

@Schema({ collection: CommonDBCollections.ROLE, timestamps: true })
export class Role extends CommonSchema {
    @Prop({
        required: true,
        unique: true,
        type: String
    })
    name: string

    @Prop({
        required: true,
        type: String
    })
    desc: string

    @Prop({
        required: true,
        type: [String]
    })
    permissions: string[]
}
export const RoleSchema = SchemaFactory.createForClass(Role)
