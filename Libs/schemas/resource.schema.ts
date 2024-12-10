import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { DBCollection } from '@shared/schemas/DBcollection'

import CommonSchema from './common.schema'
import { Permission } from './permission.schema'

@Schema({ collection: DBCollection.RESOURCE, timestamps: true })
export class Resource extends CommonSchema {
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
        type: Permission
    })
    permissions: Permission[]
}
export const ResourceSchema = SchemaFactory.createForClass(Resource)
