import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import CommonDBCollections from './common.DBcollection'
import CommonSchema from './common.schema'

@Schema({ collection: CommonDBCollections.USER, timestamps: true })
export class User extends CommonSchema {
    @Prop({
        required: true,
        unique: true,
        type: String,
        trim: true,
        minlength: 2
    })
    userName: string

    @Prop({
        required: true,
        trim: true,
        minlength: 2
    })
    password: string

    @Prop({
        required: true,
        unique: true,
        type: String
    })
    salt: string

    @Prop({
        required: true,
        // type: String,
        default: ['GUEST']
    })
    roles: string[]
}
export const UserSchema = SchemaFactory.createForClass(User)
