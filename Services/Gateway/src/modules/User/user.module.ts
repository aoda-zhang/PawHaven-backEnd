import ACLModule from '@modules/ACL/ACLs.module'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import CommonDBCollections from '@shared/models/common.DBcollection'
import { UserSchema } from '@shared/models/user.schema'
import { UserController } from './user.controller'
import UserService from './user.service'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: CommonDBCollections.USER, schema: UserSchema }]),
        ACLModule
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export default class UserModule {}
