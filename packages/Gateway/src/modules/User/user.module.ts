import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { RoleSchema } from '@shared/schemas/role.schema'
import { UserSchema } from '@shared/schemas/user.schema'
import { DBCollection } from 'src/schemas/DBcollection'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: DBCollection.USER, schema: UserSchema },
            { name: DBCollection.ROLE, schema: RoleSchema }
        ])
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export default class UserModule {}
