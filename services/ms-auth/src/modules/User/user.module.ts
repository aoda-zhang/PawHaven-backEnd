import ACLModule from '@modules/ACL/ACLs.module'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserController } from './user.controller'
import UserService from './user.service'
import AuthDBCollections from '@models/auth.DBcollection'
import { UserSchema } from '@models/user.schema'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: AuthDBCollections.USER, schema: UserSchema }]),
        ACLModule
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export default class UserModule {}
